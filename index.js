var loadOrder = require("./lib/load");
var vm = require("vm");
var fs = require("fs");
var keypress = require("keypress");

// LIST THINGS CHANGED IN INCLUDE
// render.js isn't loaded, we use our own version

var contextObject = {
    document: {
        createElementNS: function() {
            // Blank function to please FileSaver
            return [];
        },
        write: function(text) {
            // console.log("Document Write: " + text);
        }
    },
    context: {
        getImageData: function() {
            require("./lib/render").scroll();
        },
        clearRect: function() {

        },
        putImageData: function() {

        }
    },
    canvas: {

    },
    addEventListener: function() {
        // Blank function to please FileSaver
    },
    Int32Array: Int32Array,
    Float64Array: Float64Array,
    ArrayBuffer: ArrayBuffer,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    DataView: DataView,
    XMLHttpRequest: function() {
        var thisThis = this;
        this.url = null;
        this.open = function(method, url) {
            this.url = url;
        };
        this.send = function() {
            console.log(this.url + " fetched.");
            if (this.url == "lua/rom.zip") {
                setTimeout(function() {
                    function toArrayBuffer(buffer) {
                        var ab = new ArrayBuffer(buffer.length);
                        var view = new Uint8Array(ab);
                        for (var i = 0; i < buffer.length; ++i) {
                            view[i] = buffer[i];
                        }
                        return ab;
                    }

                    var buffer = fs.readFileSync(__dirname + "/resources/rom.zip");
                    var arraybuffer = toArrayBuffer(buffer);

                    thisThis.response = arraybuffer;
                    thisThis.onload();

                });
            }
        };
    },
    console: console,
    overlayContext: {
        clearRect: function() {

        }
    },
    navigator: {
        userAgent: "Node.js StupidDOM"
    },
    ui: {
        onLoad: function() {

        },
        afterLoad: function() {

        }
    },
    setInterval: setInterval,
    clearInterval: clearInterval,
    setTimeout: setTimeout,
    render: require("./lib/render"),
    $: function(sel) {
        if (sel == "#overlay-canvas") {
            return {
                click: function(handler) {
                    // IMPLEMENT
                }
            };
        } else if (sel == "#mobile-input") {
            return {
                val: function() {
                    // No need to implement, we're not mobile.
                },
                bind: function() {
                    // No need to implement, we're not mobile
                }
            };
        } else if (sel == "#mobile-form") {
            return {
                submit: function() {
                    // No need to implement, we're not mobile
                }
            };
        } else {
            console.log("Unimplemented: " + sel);
        }
    },
    sidebar: {
        typeOfSelected: function() {
            return "computer";
        },
        update: function() {

        }
    }
};

var LocalStorage = require("node-localstorage").LocalStorage;
contextObject.localStorage = new LocalStorage("./persist");

contextObject.$.url = function() {
    return {
        param: function() {

        }
    };
};

contextObject.window = contextObject;

console.log("Creating context...");

var ctx = vm.createContext(contextObject);

require("./lib/render").getCTX = function() {
    return ctx;
};

loadOrder.forEach(function(v) {
    try {
        console.log("Running " + v);
        var script = new vm.Script(fs.readFileSync(__dirname + "/include/" + v + ".js"), { filename: v + ".js" });
        script.runInContext(ctx);
    } catch (e) {
        console.log("VM Error: " + e);
        console.log("Did you run the install script? Read the README.");
        process.exit(1);
    }
});

console.log("Libraries loaded, starting emulator");

try {
    var script = new vm.Script("core.run()", { filename: "nodemimic.js" });
    script.runInContext(ctx);
} catch(e) {
    console.log("VM Error: " + e);
    process.exit(2);
}

function typeKey(code, shift) {
    ctx.onkeydown({
        keyCode: code,
        shiftKey: shift,
        preventDefault: function() {}
    });
    ctx.onkeyup({
        keyCode: code,
        preventDefault: function() {}
    });
}

keypress(process.stdin);

var keyList = require("./lib/keys");

process.stdin.on("keypress", function (ch, key) {

    if (!key) {
        key = {
            sequence: ch
        };
    }

    if (keyList[key.sequence]) {
        typeKey(keyList[key.sequence][0], keyList[key.sequence][1]);
    } else if (key.name && keyList[key.name]) {
        typeKey(keyList[key.name][0], keyList[key.name][1]);
    } else {
        require("./render").writeAfter(JSON.stringify(key));
    }

    if (key && key.ctrl && key.name == "c") {
        process.exit(0);
    }
});

process.stdin.setRawMode(true);
