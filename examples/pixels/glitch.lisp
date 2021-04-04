; Glitch

(clear)

(import $path
  (rect 0 0 400 400))

(defn translate 
  (source-rect dest-pos) 
  (
    (paste 
      (copy source-rect) 
      (rect dest-pos:x dest-pos:y source-rect:w source-rect:h))))

(defn glitch 
  (rec) 
  (if 
    (gt rec 1) 
    (
      (translate 
        (rect 
          (random 1 400) 
          (random 1 400) 
          (random 1 10) 
          (random 1 10)) 
        (pos 
          (random 1 400) 
          (random 1 400))) 
      (glitch 
        (sub rec 1)))))

(glitch 500)