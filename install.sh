#!/bin/bash
echo "Node.js v12 is not currently supported due to bugs in request.js"
echo "Please change to v10 if you're using v12"
echo "Going on in 5 seconds..."
sleep 5
npm install
node lib/install.js
