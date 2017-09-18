# Ronin

Ronin is a simple open-source graphic design tool.

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width="600"/>

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

    # Verreciel

Feel free to send pull requests if you find an issue that you wish to correct.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (CC).
