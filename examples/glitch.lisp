; pixels

(
  (clear)

  ; Glitch

  (defn glitch 
    (rec) 
    (if (gt rec 1)
    ((clone 
      (rect (random 400) (random 400) 2 2)
      (rect (random 400) (random 400) 
(random 10) (random 30)))
      (glitch (sub rec 1))))
  )

  ; Draw photo 
  
  (draw 
    "../static/crystal.jpg" 
    (rect 0 0 400 400))

  (glitch 500)
)