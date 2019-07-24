# Ronin

_"All I wanted, was a quick way of resizing a few photos.."_

The application was created to automate basic graphical tasks using a dialect of [LISP](https://en.wikipedia.org/wiki/Lisp_(programming_language)), it all went south when we started adding animation tools. You can look at these [example files](https://github.com/hundredrabbits/Ronin/tree/master/examples) to better understand how this all works.

```lisp
; draw a red square
(stroke 
  (rect 30 30 100 100) 2 "red")
```

## Install & Run

You can download [builds](https://hundredrabbits.itch.io/ronin) for **OSX, Windows and Linux**, or if you wish to build it yourself, follow these steps:

```
git clone https://github.com/hundredrabbits/Ronin.git
cd Ronin/desktop/
npm install
npm start
```

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW.jpg' width='600'/>

## Library

Additional functions can be found in the [includes](https://github.com/hundredrabbits/Ronin/tree/master/desktop/sources/lisp), you can also look at the [examples](https://github.com/hundredrabbits/Ronin/tree/master/examples) to see them in action.

- `(import path rect)` Imports a graphic file with format.
- `(export path ~format ~quality)` Exports a graphic file with format.
- `(open path)` Imports a graphic file and resizes the frame.
- `(move x y)` 
- `(rotate angle)` 
- `(scale x y)` 
- `(transform a b c d e f)` 
- `(setTransform a b c d e f)` 
- `(resetTransform)` 
- `(pushTransform)` 
- `(popTransform)` 
- `(pos x y)` Returns a position shape.
- `(size w h)` Returns a size shape.
- `(rect x y w h)` Returns a rect shape.
- `(circle cx cy r)` Returns a circle shape.
- `(line a b)` Returns a line shape.
- `(text x y p t ~f)` Returns a text shape.
- `(svg x y d)` Returns a svg shape.
- `(stroke ~shape)` Strokes a shape.
- `(fill ~rect)` Fills a shape.
- `(clear ~rect)` Clears a rect.
- `(frame)` Returns a rect of the frame.
- `(center)` Returns a position of the center of the frame.
- `(resize w h ~fit)` Resizes the canvas to target w and h, returns the rect.
- `(rescale w h)` Rescales the canvas to target ratio of w and h, returns the rect.
- `(crop rect)` Crop canvas to rect.
- `(clone a b)` 
- `(theme variable ~el)` 
- `(gradient [x1 y1 x2 y2] ~colors 'black'])` 
- `(pixels rect fn q)` 
- `(saturation pixel ~q)` 
- `(contrast pixel ~q)` 
- `(concat ...items)` Concat multiple strings.
- `(add ...args)` Adds values.
- `(sub ...args)` Subtracts values.
- `(mul ...args)` Multiplies values.
- `(div ...args)` Divides values.
- `(mod a b)` Returns the modulo of a and b.
- `(clamp val min max)` Clamps a value between min and max.
- `(step val step)` 
- `(floor)` 
- `(min)` 
- `(max)` 
- `(ceil)` 
- `(sin)` 
- `(cos)` 
- `(log)` caclulates on the base of e.
- `(pow a b)` calculates a^b.
- `(sqrt)` calculate the square root.
- `(sq a)` calculate the square.
- `(PI)` 
- `(TWO_PI)` 
- `(random ...args)` 
- `(gt a b)` Returns true if a is greater than b, else false.
- `(lt a b)` Returns true if a is less than b, else false.
- `(eq a b)` Returns true if a is equal to b, else false.
- `(and a b ...rest)` Returns true if all conditions are true.
- `(or a b ...rest)` Returns true if at least one condition is true.
- `(map fn arr)` 
- `(filter fn arr)` 
- `(reduce fn arr acc)` 
- `(len item)` Returns the length of a list.
- `(first arr)` Returns the first item of a list.
- `(last arr)` Returns the last
- `(rest [_ ...arr])` 
- `(range start end ~step)` 
- `(get item key)` Gets an object's parameter with name.
- `(set item ...args)` Sets an object's parameter with name as value.
- `(of h ...keys)` Gets object parameters with names.
- `(keys item)` Returns a list of the object's keys
- `(values item)` Returns a list of the object's values
- `(convolve rect kernel)` 
- `(blur)` 
- `(sharpen)` 
- `(edge)` 
- `(dir ~path)` Returns the content of a directory.
- `(file ~path)` Returns the content of a file.
- `(dirpath ~path)` Returns the path of a directory.
- `(filepath ~path)` Returns the path of a file.
- `(exit ~force)` Exits Ronin.
- `(echo ...args)` 
- `(table arg)` 
- `(debug arg)` 
- `(time ~rate)` Returns timestamp in milliseconds.
- `(js)` Javascript interop.
- `(on event f)` Triggers on event.
- `(test name a b)` 
- `(benchmark fn)` logs time taken to execute a function.

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW2.jpg' width='600'/>

<img src='https://raw.githubusercontent.com/hundredrabbits/Ronin/master/PREVIEW3.jpg' width='600'/>

## Extras

- This application supports the [Ecosystem Theme](https://github.com/hundredrabbits/Themes).
- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
- Pull Requests are welcome!
