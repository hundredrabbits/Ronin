(echo (map '(add %1 1) (1 2 3)))

(echo (first (1 2 3)))
(echo (rest (1 2 3)))

(echo
  (filter 
    '(eq 0 (mod %1 2)) 
    (1 2 3 4 5))
)

(clear) 
(map
  '(stroke (rect (mul a 30) 20 50 50)
1 "red")
(range 0 20 5))

(map
  '(stroke 
    (rect 
      (mul %1 10) 
      (add 50 (mul (sin %1) 40)) 
      %1
      (add 20 (mul (cos %1) 50))) 1 "red")
  (range 0 200 5))

