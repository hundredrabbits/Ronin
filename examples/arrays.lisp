(echo (map (lambda (a) (add a 1)) (1 2 3)))

(
  (echo (first (1 2 3)))
  (echo (rest (1 2 3)))
)

(echo
  (filter 
    (lambda (a) (eq 0 (mod a 2))) 
    (1 2 3 4 5))
)

(
  (clear) 
  (map (lambda (a)
    (stroke (rect (mul a 30) 20 50 50) 1 "red"))
    (5 10 15 20))
)