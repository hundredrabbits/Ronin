; animation
; click Project > Toggle Animation

(
(def t (sin (div (time) 100)))

(def pos (add 200 (mul 30 t)))
(def square (lambda (a) (rect (add 200 a) a a a)))
(stroke (square pos) 1 "red")
)