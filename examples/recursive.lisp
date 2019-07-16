; recursive

(
  (clear)
  (def line-color "red")
  (defn rec 
    (v)
      (if (gt v 0)
        ((stroke (circle
                  (mul 5 v)
                  (mul 5 v)
                  (mul 5 v)) 1 line-color)
        (rec (sub v 5))))
  )
        
  (rec 100)
)