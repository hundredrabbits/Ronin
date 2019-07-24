;
(resetTransform)
(clear)
;
(def w (of (frame) :c))
(def h (of (frame) :m ))
(def mouse-pos (pos))
(def prev-pos (pos))
;
(defn when-mouse-move (e) (
  (set mouse-pos :x (of e :x))
  (set mouse-pos :y (of e :y))
))
;
(defn when-animate () (
  (stroke (line (of prev-pos :x) (of prev-pos :y) (of mouse-pos :x) (of mouse-pos :y)) 4 "#72dec2")
  (move w h)
  (rotate 0.002)
  (scale 0.998)
  (translate (frame) (pos (mul -1 w) (mul -1 h)))
  (resetTransform)
  (fill (frame) "#00000004")
  (set prev-pos :x (of mouse-pos :x))
  (set prev-pos :y (of mouse-pos :y))
))
;
(on "animate" when-animate)
(on "mouse-move" when-mouse-move)