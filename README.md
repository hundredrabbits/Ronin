# Ronin

<img src="https://raw.githubusercontent.com/hundredrabbits/100r.co/master/media/content/characters/ronin.hello.png" width="300"/>

Ronin is a <b>procedural graphics tool</b> designed to automate simple graphical tasks, like resizing, cropping, coloring, and generating algorithmic images. It interprets a minimal <a href="https://en.wikipedia.org/wiki/Lisp_(programming_language)" target="_blank" rel="noreferrer" class="external ">dialect of LISP</a>, look at these <a href="https://github.com/hundredrabbits/Ronin/tree/master/examples" target="_blank" rel="noreferrer" class="external ">examples</a> to better understand how this all works.

The library updates is constantly revealing new applications to Ronin, you can see the list of available functions <a href="https://github.com/hundredrabbits/Ronin#library" target="_blank" rel="noreferrer" class="external ">here</a>. Most of our iconography and designs were created with both <a href="https://hundredrabbits.itch.io/Ronin" target="_blank">Ronin</a> and <a href="https://hundredrabbits.itch.io/dotgrid">Dotgrid</a>.

Learn more by reading the <a href="https://github.com/Hundredrabbits/Ronin" target="_blank" rel="noreferrer" class="external ">manual</a>, or have a look at some experiments on <a href="https://twitter.com/neauoire/status/1152481692193419267" target="_blank" rel="noreferrer" class="external ">twitter</a>. If you need <b>help</b>, visit the <a href="https://hundredrabbits.itch.io/ronin/community" target="_blank" rel="noreferrer" class="external ">Community</a>, follow the [workshop](https://github.com/hundredrabbits/Ronin/blob/master/WORKSHOP.md) or watch the [video tutorial](https://www.youtube.com/watch?v=SgAWGh1s9zg).

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

## Helpers

Ronin helpers are keywords that facilitates adding coordinates from the canvas into your script. The currently supported helpers are `$rect`, `$pos`, `$circle`, `$line` and `$drag`. Holding right-click while using a $helper will run the script as the mouse is injecting coordinates into the script. Paste the following script, and trace a shape in the canvas:

```lisp
; draw a red circle
(fill $circle "red")
```

## Library

- `(import path shape)` Imports a graphic file with format.
- `(export path ~format ~quality)` Exports a graphic file with format.
- `(open path ~ratio)` Imports a graphic file and resizes the frame.
- `(move x y)` 
- `(rotate angle)` 
- `(scale x y)` 
- `(transform a b c d e f)` 
- `(setTransform a b c d e f)` 
- `(resetTransform)` 
- `(pushTransform)` 
- `(popTransform)` 
- `(pos ~x ~y)` Returns a position shape.
- `(size w h)` Returns a size shape.
- `(rect x y w h)` Returns a rect shape.
- `(circle cx cy r)` Returns a circle shape.
- `(line ax ay bx by)` Returns a line shape.
- `(text x y p t ~f)` Returns a text shape.
- `(svg x y d)` Returns a svg shape.
- `(offset a b)` Returns the offset between two pos.
- `(stroke ~shape)` Strokes a shape.
- `(fill ~rect)` Fills a shape.
- `(gradient line ~colors 'black'])` Defines a gradient color.
- `(guide shape color)` Draws a shape on the guide layer.
- `(clear ~rect)` Clears a rect.
- `(frame)` Returns a rect of the frame.
- `(center)` Returns a position of the center of the frame.
- `(resize w h ~fit)` Resizes the canvas to target w and h, returns the rect.
- `(rescale w h)` Rescales the canvas to target ratio of w and h, returns the rect.
- `(crop rect)` Crop canvas to rect.
- `(clone a b)` 
- `(drag ~rect)` 
- `(theme variable ~el)` 
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
- `(min)` 
- `(max)` 
- `(ceil)` 
- `(floor)` round down to the nearest integer.
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
