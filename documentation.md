# Functions

## IO

`(open path)`

`(export path type quality)`

`(draw path rect)`

`(resize width height)`

`(crop rect)`

`(folder path)` 

`(exit)`

## Logic

`(gt a b)` check if `a` is greater than `b`

`(lt a b)` check if `a` is lower than `b`

`(eq a b)` check if `a` is equal to `b`

`(and a b <c d...>)` returns true if all conditions are true

`(or a b <cd...>)` returns true if at least one condition is true

## Arrays

`(map function array)`

`(filter function array)`

`(reduce function array accumulator)`

`(len array)`

`(first array)`

`(last array)`

`(rest array)`

`(range start end step)`

## Shapes

`(pos x y)`

`(size w h)`

`(rect x y w h t)`

`(circle x y r)`

`(line start end)`

`(text x y g string font)`

`(svg data)`

## Helpers

`(frame)`

`(center)`

`(scale rect width height)`

## Copy/Paste

`(clone start end)` clone start `rect` into end `rect`

`(stroke shape thickness color)`

`(fill shape color)`

`(clear shape)`

## Objects

`(get item key <keys>)`

`(set item key val)`

## Colors

`(theme variable)`

`(gradient (x1,y1,x2,y2) colors)`

`(pixels rect function q)`

`(saturation pixel q)`

`(contrast pixel q)`

## Math

`(add ...values)`

`(sub...values)`

`(mul ...values)`

`(div ...values)`

`(mod a b)`

`(clamp value min max)`

`(step value step)`

`(min a b)`

`(max a b)`

`(ceil value)`

`(floor value)`

`(sin a)`

`(cos a)`

`PI, TWO_PI`

`(random)`

`(random start end)`

`(random max)`

## Generics

`(echo args)`

`(str args)`

`(test name value expectedValue)`

## Livecoding

`(time)` returns timestamp in milliseconds

`(animate)` start animation

`(animate false)` stop animation

## Javascript interop

`js`

## Client

`ronin`
