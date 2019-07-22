; Glitch

(clear)

(defn glitch 
  (rec) 
  (if (gt rec 1)
    (
      (translate
        (rect (random 400) (random 400) (random 10) (random 10))
        (pos (random 400) (random 400)))
      (glitch (sub rec 1)))))

(import 
  "../static/crystal.jpg" 
  (rect 0 0 400 400))

(glitch 500)