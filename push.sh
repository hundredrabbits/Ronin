#!/bin/bash

rm -r 'release'
mkdir 'release'
cp 'index.html' 'release/index.html'
cp 'README.txt' 'release/README.txt'
~/Applications/butler push ~/Repositories/Hundredrabbits/Ronin/release hundredrabbits/ronin:main
~/Applications/butler status hundredrabbits/ronin
rm -r 'release'