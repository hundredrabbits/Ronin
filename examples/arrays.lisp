(echo (map (lambda (a) (add a 1)) (1 2 3)))

(echo (first (1 2 3)))
(echo (rest (1 2 3)))

(echo
  (filter 
    (lambda (a) (eq 0 (mod a 2))) 
    (1 2 3 4 5))
)

(clear) 
(map (lambda (a)
  (stroke (rect (mul a 30) 20 50 50)
1 "red"))
(range 0 20 5))

(map (lambda (a)
  (stroke 
    (rect 
      (mul a 10) 
      (add 50 (mul (sin a) 40)) 
      a 
      (add 20 (mul (cos a) 50))) 1 "red"))
  (range 0 200 5))