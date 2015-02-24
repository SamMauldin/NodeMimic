# Node-Mimic

Node-Mimic is a port of the excellent [Mimic](https://github.com/1lann/Mimic)
project to node.js, and by extent, the terminal.

![](https://github.com/Sxw1212/NodeMimic/blob/master/img/ScreenShot.png)

## Installing

You need [Node.js](https://nodejs.org) installed to run NodeMimic.

    git clone https://github.com/Sxw1212/NodeMimic.git
    cd NodeMimic
    ./install.sh

## Running

Just run index.js. The filesystem is fully persistant.

    node index.js

## Bugs and Missing Features

- Colors are not yet supported
- HTTP is not yet supported
- Cursor blinking and hiding is not yet supported
- The escape key is used in place of the control key because we can't capture
that in the terminal.
- All Mimic limitations apply

## License

We don't have any of the Mimic code in this repo. It is downloaded with an
install script.

Node-Mimic itself is licensed under the MIT license.
