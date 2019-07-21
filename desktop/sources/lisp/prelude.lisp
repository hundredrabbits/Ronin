; 
(echo "Loading prelude.lisp")
; translate
(defn translate 
  (r p) 
  (clone r 
    (rect 
      (of p :x) 
      (of p :y) 
      (of r :w) 
      (of r :h))))
; times
(defn times 
  (v f) 
  (
    (f v) 
    (if 
      (gt v 1) 
      (times 
        (sub v 1) f))))
; convert deg to radians
(defn deg-rad 
  (deg) 
  (mul deg 
    (div PI 180)))
; position on a circle from angle
(defn circle-pos 
  (cx cy r a) {:x 
  (add cx 
    (mul r 
      (cos a))) :y 
  (add cy 
    (mul r 
      (sin a)))})