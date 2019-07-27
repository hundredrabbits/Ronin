; dejong attractor

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
    (range 0 r)
    (λ (acc val)
      (first (
        (_dejong (first acc) (last acc) a b c d)
      )))
    (2 1)
  )
)
(benchmark 
  '(dejong 12800 
    (random -2 2)
    (random -2 2)
    (random -2 2)
    (random -2 2) 
))
