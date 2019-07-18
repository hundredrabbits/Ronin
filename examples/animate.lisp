; animate

(
  (clear)
  (def t (sin (div (time) 100)))

  (def pos (add 200 30 (mul 30 t)))
  (defn square (a) (rect a a a a))
  (stroke (square pos) 1 "red")

  ; set false to stop 
  (animate true)
)