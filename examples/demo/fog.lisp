(resetTransform)
(clear)

(def w (of (frame) :c))
(def h (of (frame) :m ))

(defn mouse-pos (pos))
(defn prev-pos (pos))

(defn update (e) (
  (set mouse-pos :x (of e :x))
  (set mouse-pos :y (of e :y))
))

(on "animate" '(
  (stroke (line prev-pos mouse-pos) 4 "#fff")
  (move w h)
  (rotate 0.002)
  (scale 0.998)
  
  (translate (frame) (pos (mul -1 w) (mul -1 h)))
  (resetTransform)
  (fill (frame) "#00000004")
  (set prev-pos :x (of mouse-pos :x))
  (set prev-pos :y (of mouse-pos :y))
))

(on "mouse-move" update)