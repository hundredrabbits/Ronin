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