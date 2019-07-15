; recursive

(
  (clear)
  (defn rec 
    (v)
      (if (gt v 0)
        ((stroke (circle
                  (mul 5 v)
                  (mul 5 v)
                  (mul 5 v)) 1 "red")
        (rec (sub v 5))))
  )
        
  (rec 100)
)