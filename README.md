# Ronin

Ronin is my web based drawing tool it's under constant development. 
The repository comes with a script that fires Ronin from within Localhost.

## Example file

```
surface.resize 300x300
layer.fill #AAAAAA
magnet.grid 15x15 4,4
path:line_width 2
path.stroke M60,60 A1,1 0 0,0 240,60 A1,1 0 0,0 240,240
path.stroke M240,240 A1,1 0 0,0 60,240 A1,1 0 0,0 60,60
```

## Load a preset

Where `http://localhost:8022` will load the /presets/default.rin file, `http://localhost:8022/blank` will load /presets/blank.rin.

## TODOs
  General
    Merge layers
    Export multiple layers file
    Syntax highlight
  % Render
    balance auto=true ~ auto color
    balance 0.8       ~ equal RGB balance
  Brush
    Texture paint
  Save
    source.save 1280x800 ~ Export with size
  > Terminal
    Auto Complete(tab)
  ? Interrog
    Inline Help
  * Eye
    Swatches, handle all colors
  - Widget
    Clickeable links
  - Render
    Progress update