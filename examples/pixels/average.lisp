; Average color
(clear) 
(def photo-rect 
  (rect 0 0 
    (div 4240 3) 
    (div 2400 3)))
(resize photo-rect:w photo-rect:h)
(import $path photo-rect)
(def average-color 
  (pick 
    (guide 
      (rect 774 100 500 500))))
(fill 
  (guide 
    (rect 228 100 500 500)) average-color)