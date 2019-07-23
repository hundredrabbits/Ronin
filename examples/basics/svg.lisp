; welcome to ronin - v2.1
(clear) 
; ronin path 
(def align {:x 
  (sub 
    (of 
      (frame) :center) 500) :y 
  (sub 
    (of 
      (frame) :middle) 150)})
; outline 
(fill 
  (svg 
    (of align :x) 
    (of align :y) "M15,15 L15,15 L285,15 L285,285 L15,285 Z") "#fff")
; stroke
(stroke 
  (svg 
    (of align :x) 
    (of align :y) "M60,60 L195,60 A45,45 0 0,1 240,105 A45,45 0 0,1 195,150 L60,150 M195,150 A45,45 0 0,1 240,195 L240,240 ") 5 "#000")