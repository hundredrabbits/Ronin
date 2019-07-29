; Shapes

(clear)

; variables
(def center-w (div frame-rect:w 2))
(def center-h (div frame-rect:h 2))
(def rad (div frame-rect:h 4))

; draw circle
(stroke 
  (circle center-w center-h rad) "white" 2)

; draw rect
(stroke 
  (rect 
    (sub center-w rad) (sub center-h rad) center-h center-h) "white" 2)

; draw line
(stroke 
  (line (sub center-w rad) center-h (add center-w rad) center-h))
(stroke (text 10 170 200 "HELL") "pink" 2)

; draw ellipse
(stroke 
  (ellipse center-w center-h rad (div rad 2)) "white" 2)
