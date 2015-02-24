var request = require("request");
var fs = require("fs");

var url = "https://github.com/gravlann/gravlann.github.io/raw/75dd6fad7e1a6d990072d0c17fe823b3d81f51ba/";

var files = [
    ["include/bit.js", "scripts/apis/bit.js"],
    ["include/Blob.js", "scripts/lib/Blob.js"],
    ["include/browserfs.js", "scripts/lib/browserfs.js"],
    ["include/code.js", "scripts/code.js"],
    ["include/computer.js", "scripts/computer.js"],
    ["include/core.js", "scripts/core.js"],
    ["include/event.js", "scripts/event.js"],
    ["include/FileSaver.js", "scripts/lib/FileSaver.js"],
    ["include/filesystem.js", "scripts/filesystem.js"],
    ["include/fs.js", "scripts/apis/fs.js"],
    ["include/globals.js", "scripts/globals.js"],
    ["include/http.js", "scripts/apis/http.js"],
    ["include/lua5.1.5.min.js", "scripts/lib/lua5.1.5.min.js"],
    ["include/os.js", "scripts/apis/os.js"],
    ["include/peripheral.js", "scripts/apis/peripheral.js"],
    ["include/purl.js", "scripts/lib/purl.js"],
    ["include/redstone.js", "scripts/apis/redstone.js"],
    ["include/term.js", "scripts/apis/term.js"],
    ["include/xdRequest.js", "scripts/lib/xdRequest.js"],
    ["resources/rom.zip", "lua/rom.zip"]
];

var dir = __dirname.split("/");
dir.pop();
dir = dir.join("/") + "/";

files.forEach(function(v) {
    console.log("Downloading " + v[0]);
    var saveTo = dir + v[0];
    var getFrom = url + v[1];

    try {
        fs.unlinkSync(saveTo);
    } catch (e) {
        // File didn't already exist
    }

    request(getFrom).pipe(fs.createWriteStream(saveTo));
});
