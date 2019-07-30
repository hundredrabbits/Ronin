# Workshop

This workshop is designed to go over the **most commonly used functions** with [Ronin](https://github.com/hundredrabbits/Ronin). The list of all available functions and their usage is located [here](https://github.com/hundredrabbits/Ronin/#library). You can also follow along our [video tutorial](https://youtu.be/SgAWGh1s9zg).

- **Part 1**: [Images](#Images) `(open)`, `(import)`, `(crop)`, `(export)`
- **Part 2**: [Draw](#Draw) `(stroke)`, `(fill)`, `(gradient)`, `(clear)`
- **Part 3**: [Filters](#Filters) `(pixels)`, `(saturation)`, `(convolve)`, `(sharpen)`
- **Part 4**: [Events](#Events) `(echo)`, `(on "mouse-down")`, `(on "animate")`, `(on "/a")`

## Images

This section will teach the basics of opening, cropping and saving an image file. You can use the `$path` helper to quickly get an image's path into Ronin, by writing `$path` and dragging a file onto the Ronin window.

### Open

To open an image, **and resize the canvas to fit the image size**, type the following text, drag an image file onto the Ronin window and press `cmd+r`:

```lisp
(open $path)
```

### Import

To import an image onto the current canvas, type the following text, drag an image file onto the Ronin window, trace a shape in the canvas and press `cmd+r`:

```lisp
(import $path 
  (guide $rect))
```

The previous code will import an image, and preserve its ratio. Alternatively, you could use a `$line` to stretch the image, or a `$pos` to simply draw the image at its original size.

```lisp
(import $path 
  (guide $line))
```

### Crop

To crop the canvas, type the following text, drag an image file onto the Ronin window press `cmd+r`:

```lisp
(import $path 
  (pos 0 0))
(crop 
  (rect 50 50 300 300))
```

### Export

To export the resulting image, type the following text, drag an image file onto the Ronin window, then drag a folder and add the new file's name, and press `cmd+r`:

```lisp
(import $path)
(export $path)
```

For example, a version of that same code with file paths, might look something like the following, notice how the `(rect)` is omitted, if a `(rect)` is not present, the entire canvas size will be exported:

```lisp
(import "~/Desktop/photo.jpg")
(export "~/Desktop/export.png")
```

If you are working on from a saved `.lisp` file, you can also export directly into the working directory with:

```lisp
(export 
  (concat 
    (dirpath) "/" "hello.jpg"))
```

## Draw

This section will teach you how to draw some basic shapes and colorize them.

### Stroke

In Ronin, a shape is either a `(rect)`, a `(line)`, a `(circle)` or a `(pos)`. To draw the outline of any shape, wrap the shape inside of a `(stroke shape width color)` function, like:

```lisp
(stroke 
  (rect 100 100 300 200) "red" 10)
```

Or, if you would like to trace the shape with your mouse:

```lisp
(stroke 
  $rect "red" 10)
```

### Fill

To fill the inside of any shape, wrap it inside of a `(fill shape color)` function, like:

```lisp
(fill 
  (rect 100 100 300 200) "orange")
```

### Gradient

To colorize a stroke or a fill, with a gradient, use the `(gradient line colors)` where the colors is a list of colors like `("blue" "red" "yellow")`:

```lisp
(clear)
(fill 
  (circle 300 300 200) 
  (gradient 
    (line 0 0 500 500) 
    ("white" "black")))
```

To better understand how the `(line)` affects the coloring of the circle, wrap the `$line` inside a `(guide)`, as follows to preserve the guide interface:

```lisp
(clear)
(fill 
  (circle 300 300 200) 
  (gradient 
    (guide $line)
    ("white" "black")))
```

### Clear

In the previous example, we used the `(clear)` function, which clears the canvas, but it can also be used to clear only a part of the canvas:

```lisp
(clear)
(fill 
  (frame) "red")
(clear 
  (rect 100 100 300 300))
```

## Filters

This section will cover how to manipulate the pixels of an image.

### Pixels

First let's open an image, ideally one in color, and change every pixel of a selected area at `(rect 100 100 200 200)`:

```lisp
(open $path)
(pixels saturation 10 
  (rect 100 100 200 200))
```

### saturation

In the previous example, we increased the saturation of a region of the image, to desaturate an entire image, you can simply omit the  `(frame)` which will select the entire canvas, and set the pixel filter to `saturation` and the value to `0.5`(50% saturation):

```lisp
(open $path)
(pixels saturation 0.5)
```

### convolve

Effects which use the surrounding pixels, or convolution matrix, are used with the `(convolve)` function, you can learn more about this family of filters [here](https://en.wikipedia.org/wiki/Kernel_(image_processing)).

### sharpen

```lisp
(open $path)
(convolve sharpen $rect)
```

Custom convolve kernels can also be created like this:

```lisp
(open $path)
(def blur 
  (
    (-1 -1 -1) 
    (-1 5 -1) 
    (-1 -1 -1)))
(convolve blur)
```

## Events

This section will demonstrate how to use events in Ronin to create interactive scripts.

### Echo

You can print some content to the screen in Ronin, by using the `(echo)` function, for example, the following script will write the word `hello` at the bottom left of the interface:

```lisp
(echo "hello")
```

### MouseDown

Let's use the `(debug)` function to display the position of the mouse cursor in the interface.

```lisp
(on "mouse-down" echo)
```

We can define a function that triggers when the `mouse-down` event is detected, or when you click on the canvas:

```lisp
; define the function
(defn draw-rect 
  (e) 
  (fill e:circle "red"))
; use the function
(on "mouse-move" draw-rect)
```

For more examples of functions, see the [examples](https://github.com/hundredrabbits/Ronin/tree/master/examples).

You can find a more elaborate version of this example [here](https://github.com/hundredrabbits/Ronin/blob/master/examples/events/on-mouse.lisp).

### Animate

The `animate` event fires around 30 times per second, and is a perfect tool to create animations. Following the previous example, and the pattern of creating a function and binding it to the event, let's make a function that will use the `(time)` to animate a box:

```lisp
; define the function
(defn wob-rect 
  () 
  (
    (clear) 
    (def rect-x 300)
    (def rect-y (add (mul (sin (time 0.005)) 50) 300))
    (fill 
      (rect rect-x rect-y 100 100) "red")))
; use the function
(on "animate" wob-rect)
```

You can find a more elaborate version of this example [here](https://github.com/hundredrabbits/Ronin/blob/master/examples/events/on-animate.lisp).

### OSC

Other programs can communicate with Ronin via OSC with the previous pattern. For example, if you send OSC data to the port `49162`, at the path `/a`, the event can be used in Ronin to trigger a function:

```lisp
(on "/a" echo)
```

You can find a more elaborate version of this example [here](https://github.com/hundredrabbits/Ronin/blob/master/examples/events/on-osc.lisp).

I hope this workshop has been enlightening, if you have questions or suggestions, please visit the [community](https://hundredrabbits.itch.io/ronin/community). Enjoy!
