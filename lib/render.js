// Repeat polyfill until general ES6 adoption
String.prototype.repeat = String.prototype.repeat || function( num )
{
    return new Array( num + 1 ).join( this );
};

var fakeTerm = [];

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
        terminal.move(getCTX().core.computers[0].cursor.x || 0, getCTX().core.computers[0].cursor.y || 0);
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

function setup(cb) {
    cb();
}

module.exports.setup = setup;

function characterBackground(x, y, bg) {
    // TODO: Colors
}

module.exports.characterBackground = characterBackground;

function characterText(x, y, c, fg) {
    fakeTerm[y][x] = c;
}

module.exports.characterText = characterText;

function character(x, y, c) {
    characterText(x, y, c);
}

module.exports.character = character;

function border() {
    // Blank function
}

module.exports.border = border;

function clearLine(y) {
    var line = [];
    for (var x = 0; x < 51; x++) {
        line[x] = " ";
    }
    fakeTerm[y - 1] = line;
}

module.exports.clearLine = clearLine;

function clear() {
    fakeTerm = makeFakeTerm();
    fullDraw();
}

module.exports.clear = clear;

function text(x, y, t) {
    y = y - 1;
    x = x - 1;
    for (var c = 0; c < t.length; c++) {
        character(x + c, y, t[c]);
    }
    fullDraw();
}

module.exports.text = text;

function cursorBlink() {
    resetCursor();
}

module.exports.cursorBlink = cursorBlink;

function writeAfter(text) {
    terminal.move(0, 21);
    terminal.clearLine();
    console.log(text);
}

module.exports.writeAfter = writeAfter;

function bsod(text) {
    writeAfter("BSOD: " + text);
    process.exit(3);
}

module.exports.bsod = bsod;

function scroll() {
    fakeTerm.shift();
    var line = [];
    for (var x = 0; x < 51; x++) {
        line[x] = " ";
    }
    fakeTerm[18] = line;
}

module.exports.scroll = scroll;
