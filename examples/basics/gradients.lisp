; gradients
(clear)
;
(def radius (of (frame) :m))
;
(def gradient-line 
  (line 
    (of (frame) :c) 0 
    (of (frame) :c) 
    (of (frame) :h)))
;
(fill 
  (circle 
    (of (frame) :c) 
    (of (frame) :m) 
    radius) 
  (gradient gradient-line ("#72dec2" "white")))
;
(fill 
  (circle 
    (of (frame) :c) 
    (of (frame) :m) 
    (mul radius 0.75)) 
  (gradient gradient-line ("white" "#72dec2")))
;
(fill 
  (circle 
    (of (frame) :c) 
    (of (frame) :m) 
    (mul radius 0.5)) 
  (gradient gradient-line ("#72dec2" "white")))