; random 

(clear) 
(defn place 
  (rec) 
  (if 
    (gt rec 0) 
    (
      (import $path
        (rect 
          (random 200) 
          (random 200) 
          (random 200) 
          (random 200))) 
      (place 
        (sub rec 1))))) 
(place 30)