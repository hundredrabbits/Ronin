#!/bin/bash
cd ~/Github/HundredRabbits/Ronin/
electron-packager . Ronin --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
mv -v ~/Desktop/Ronin-darwin-x64/Ronin.app /Applications/
rm -r ~/Desktop/Ronin-darwin-x64/
open -a "Ronin"