## Build

Don't forget to ```npm cache clean```!

### Build Linux64 / Darwin64 / Windows64(Offsite)

```
cd /xxiivv/Nataniev/public/public.projects/sources/Ronin/

git pull

rm -r /xxiivv/Nataniev/public/public.projects/builds/Ronin-linux-x64/ 
rm /xxiivv/Nataniev/public/public.projects/builds/ronin_lin64.zip
electron-packager . Ronin --platform=linux --arch=x64 --out /xxiivv/Nataniev/public/public.projects/builds --overwrite --electron-version=1.7.5 --icon=icon.ico

rm -r /xxiivv/Nataniev/public/public.projects/builds/Ronin-win32-x64/ 
rm /xxiivv/Nataniev/public/public.projects/builds/ronin_win64.zip
electron-packager . Ronin --platform=win32 --arch=x64 --out /xxiivv/Nataniev/public/public.projects/builds --overwrite --electron-version=1.7.5 --icon=icon.ico

rm -r /xxiivv/Nataniev/public/public.projects/builds/Ronin-darwin-x64/
rm /xxiivv/Nataniev/public/public.projects/builds/ronin_osx64.zip
electron-packager . Ronin --platform=darwin --arch=x64 --out /xxiivv/Nataniev/public/public.projects/builds --overwrite --electron-version=1.7.5 --icon=icon.icns

cd /xxiivv/Nataniev/public/public.projects/builds/

~/butler push /xxiivv/Nataniev/public/public.projects/builds/Ronin-linux-x64/ hundredrabbits/ronin:linux-64
~/butler push /xxiivv/Nataniev/public/public.projects/builds/Ronin-win32-x64/ hundredrabbits/ronin:windows-64
~/butler push /xxiivv/Nataniev/public/public.projects/builds/Ronin-darwin-x64/ hundredrabbits/ronin:osx-64

rm -r /xxiivv/Nataniev/public/public.projects/builds/Ronin-darwin-x64/
rm -r /xxiivv/Nataniev/public/public.projects/builds/Ronin-linux-x64/
rm -r /xxiivv/Nataniev/public/public.projects/builds/Ronin-win32-x64/

~/butler status hundredrabbits/ronin
```