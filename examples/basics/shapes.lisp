; display a collection of all shapes.

(def colors 
  ("#000000" "#72dec2"))

;
(clear)

(stroke 
  (rect 0 0 300 300) colors:0)

(stroke 
  (circle 150 150 150) colors:1)

(stroke 
  (ellipse 150 150 75 150) colors:0)

(stroke 
  (line 0 150 300 150) colors:0)

(stroke 
  (text 600 300 60 "hell") colors:1)

(stroke 
  (arc 600 298 296 
    (rad 180) 
    (rad -90)) colors:1)

(stroke 
  (poly 
    (pos 300 300) 
    (pos 600 0) 
    (pos 600 300)) colors:0)

(transform:move 0 300)

(fill 
  (rect 0 0 300 300) colors:0)

(fill 
  (circle 150 150 150) colors:1)

(fill 
  (ellipse 150 150 75 150) colors:0)

(fill 
  (line 0 150 300 150) colors:0)

(fill 
  (text 600 300 60 "hell") colors:1)

(fill 
  (arc 600 298 296 
    (rad 180) 
    (rad -90)) colors:1)

(fill 
  (poly 
    (pos 300 300) 
    (pos 600 0) 
    (pos 600 300)) colors:0)

(transform:reset)