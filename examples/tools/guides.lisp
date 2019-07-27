(clear)
; guides
(fill (frame) "white")
(def frame-rect (frame))
(defn draw-cross 
  (pos) 
  (guide {:x (floor pos:x) :y (floor pos:y)}))
; top
(draw-cross 
  (pos 
    (mul frame-rect:w 0.25) 
    (mul frame-rect:h 0.25)))
(draw-cross 
  (pos 
    (mul frame-rect:w 0.5) 
    (mul frame-rect:h 0.25)))
(draw-cross 
  (pos 
    (mul frame-rect:w 0.75) 
    (mul frame-rect:h 0.25)))
; middle
(draw-cross 
  (pos 
    (mul frame-rect:w 0.25) 
    (mul frame-rect:h 0.5)))
(draw-cross 
  (pos 
    (mul frame-rect:w 0.5) 
    (mul frame-rect:h 0.5)))
(draw-cross 
  (pos 
    (mul frame-rect:w 0.75) 
    (mul frame-rect:h 0.5)))
; bottom
(draw-cross 
  (pos 
    (mul frame-rect:w 0.25) 
    (mul frame-rect:h 0.75)))
(draw-cross 
  (pos 
    (mul frame-rect:w 0.5) 
    (mul frame-rect:h 0.75)))
(draw-cross 
  (pos 
    (mul frame-rect:w 0.75) 
    (mul frame-rect:h 0.75)))