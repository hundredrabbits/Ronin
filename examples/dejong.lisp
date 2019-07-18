; dejong attractor

(
  (clear) 
  (defn point (x y color) 
    (fill (rect x y 1 1) color))

  (defn _dejong (x y a b c d)
    (rest ((point 
      (add 300 (mul 100 x))
      (add 400 (mul 100 y))
      "red")
    (add (sin (mul a y)) (mul x (cos (mul b x))))
    (add (mul x (sin (mul x c))) (cos (mul d y)))
    ))
  )

  (defn dejong (r a b c d)
    (reduce  
      (lambda (acc val)
        (first (
          (_dejong (first acc) (last acc) a b c d)
        )))
      (range 0 r)
      (2 1)
    )
  )
  (dejong 1280 1.6 -2.3 2.4 -2.1)
)
