; random 

(
  (clear)

  (defn place
    (rec)
    (if (gt rec 0)
      ((draw "../static/crystal.jpg"
      (rect 
        (random 200)
        (random 200) 
        (random 200) 
        (random 200))
      (lambda () (place (sub rec 1)))
    )))
)
    
  (place 30)
)