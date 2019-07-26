; send OSC msg to port:49162, at "/a"
(def frame-rect 
  (frame))
(def disc 
  (circle frame-rect:c frame-rect:m 200))
;
(defn on-animate 
  () 
  (
    (clear) 
    (fill disc "#72dec2") 
    (set disc "r" 
      (clamp 
        (mul disc:r 0.95) 0 200))))
;
(defn on-osc 
  (msg) 
  (
    (echo msg) 
    (set disc "r" 200)))
; triggers
(on "animate" on-animate)
(on "/a" on-osc)