// Repeat polyfill until general ES6 adoption
String.prototype.repeat = String.prototype.repeat || function( num )
{
    return new Array( num + 1 ).join( this );
};

var fakeTerm = [];
var render = {};

function makeFakeTerm() {
    var ft = [];
    for (var y = 0; y < 19; y++) {
        ft[y] = [];
        for (var x = 0; x < 51; x++) {
            ft[y][x] = " ";
        }
    }
    return ft;
}

fakeTerm = makeFakeTerm();

function writeText(text) {
    process.stdout.write(text);
}

var terminal = require("./terminal");

var characters = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

function resetCursor() {
    // Always display cursor: Fix async print
    //if (module.exports.getCTX().core.computers[0].cursor.blink) {
        terminal.move(module.exports.getCTX().core.computers[0].cursor.x || 0, module.exports.getCTX().core.computers[0].cursor.y || 0);
    //} else {
    //    terminal.move(0, 0);
    //}
}

function fullDraw() {
    var lines = [];
    lines.push("+" + "-".repeat(51) + "+");
    for (var y = 0; y < 19; y++) {
        lines.push("|" + fakeTerm[y].join("") + "|");
    }
    lines.push("+" + "-".repeat(51) + "+");
    terminal.clear();
    lines.forEach(function(v, k) {
        terminal.move(0, k);
        writeText(v);
    });
    resetCursor();
}

render.setup = function(cb) {
    cb();
};

render.characterBackground = function (x, y, bg) {
    // TODO: Colors
};

render.characterText = function (x, y, c, fg) {
    fakeTerm[y][x] = c;
};

render.character = function (x, y, c) {
    render.characterText(x, y, c);
};

render.border = function () {
    // Blank function
};

render.clearLine = function (y) {
    var line = [];
    for (var x = 0; x < 51; x++) {
        line[x] = " ";
    }
    fakeTerm[y - 1] = line;
};

render.clear = function () {
    fakeTerm = makeFakeTerm();
    fullDraw();
};

render.text = function (x, y, t) {
    y = y - 1;
    x = x - 1;
    for (var c = 0; c < t.length; c++) {
        render.character(x + c, y, t[c]);
    }
    fullDraw();
};

render.cursorBlink = function () {
    resetCursor();
};

render.writeAfter = function (text) {
    terminal.move(0, 21);
    terminal.clearLine();
    console.log(text);
};

render.bsod = function (text) {
    writeAfter("BSOD: " + text);
    process.exit(3);
};

render.scroll = function () {
    fakeTerm.shift();
    var line = [];
    for (var x = 0; x < 51; x++) {
        line[x] = " ";
    }
    fakeTerm[18] = line;
};

module.exports = render;
