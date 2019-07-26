;
(resetTransform)
(clear)
;
(def frame-rect (frame))
(def mouse-pos (pos))
(def prev-pos (pos))
;
(defn when-mouse-move (e) (
  (set mouse-pos "x" e:x)
  (set mouse-pos "y" e:y)
))
;
(defn when-animate () (
  (stroke (line prev-pos:x prev-pos:y mouse-pos:x mouse-pos:y) 4 "#72dec2")
  (move frame-rect:c frame-rect:m)
  (rotate 0.002)
  (scale 0.998)
  (translate frame-rect (pos (mul -1 frame-rect:w) (mul -1 frame-rect:h)))
  (resetTransform)
  (fill frame-rect "#00000004")
  (set prev-pos "x" mouse-pos:x)
  (set prev-pos "y" mouse-pos:y)
))
;
(on "animate" when-animate)
(on "mouse-move" when-mouse-move)