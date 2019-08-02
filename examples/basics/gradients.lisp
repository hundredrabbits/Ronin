; gradients
(clear)
;
(def frame-rect (frame))
(def radius 
  (frame-rect:m))
;
(def gradient-line 
  (line frame-rect:c 0 frame-rect:c frame-rect:h))
;
(fill 
  (circle frame-rect:c frame-rect:m radius) 
  (gradient gradient-line 
    ("#72dec2" "white")))
;
(fill 
  (circle frame-rect:c frame-rect:m 
    (mul radius 0.75)) 
  (gradient gradient-line 
    ("white" "#72dec2")))
;
(fill 
  (circle frame-rect:c frame-rect:m 
    (mul radius 0.5)) 
  (gradient gradient-line 
    ("#72dec2" "white")))