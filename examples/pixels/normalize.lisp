; Normalize photo colors

(open $path 0.5)

;(pick (rect 0 0 100 100)) will return the average color
;of 100x100px rectangle.
;without extra arguments, 
;pick grabs the whole canvas by default, 
;and calculates the average color.
(def average-color 
  (pick))
(pixels normalize average-color)