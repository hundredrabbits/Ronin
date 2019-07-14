(
  (clear)
  (def point (lambda (x y color) (stroke (circle x y 0.1) 1 color)))
  (def _dejong (lambda (x y a b c d)
    (rest ((point 
      (add 700 (mul 100 x))
      (add 400 (mul 100 y))
      "rgba(255,0,0,1)")
    (add (sin (mul a y)) (mul x (cos (mul b x))))
    (add (mul x (sin (mul x c))) (cos (mul d y)))
    ))
  ))


  (def dejong (lambda (r a b c d)
    (reduce  
      (lambda (acc val)
        (first (
          (_dejong (first acc) (last acc) a b c d)
        )))
      (range 0 r)
      (2 1)
    )
  ))
  (dejong 32000 1.4 -2.3 2.4 -2.1)
)
