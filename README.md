# Node-Mimic

Node-Mimic is a port of the excellent [Mimic](https://github.com/1lann/Mimic)
project to node.js, and by extent, the terminal.

## Installing

To install Node-Mimic, make sure you have node.js v10 installed. v12 is not
currently supported due to a bug in request.js

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
that in the browser.
- All Mimic limitations apply

## License

We don't have any of the Mimic code in this repo. It is downloaded with an
install script.

Node-Mimic itself is licensed under the MIT license.
