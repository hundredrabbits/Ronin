(
  (clear)
  (def point (lambda (x y color) (stroke (circle x y 1) 1 color)))
  (point 50 50 "red")
  (point 50 150 "red")
  (def dejong (lambda (i x y a b c d)
    (if (gt i 0)
      (
        (point 
          (add 200 (mul 50 x))
          (add 200 (mul 50 y))
          "red")
        (dejong 
          (sub i 1) 
          (add (sin (mul a y)) (mul x (cos (mul b x))))
          (add (mul x (sin (mul x c))) (cos (mul d y)))
          a b c d)
      )
      (echo "done"))
  ))
  (dejong 800 40 40 1.4 -2.3 2.4 -2.1)
)
