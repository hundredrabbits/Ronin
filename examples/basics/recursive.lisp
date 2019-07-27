; recursive

(clear) 
(defn rec 
  (v) 
  (if 
    (gt v 0) 
    (
      (stroke 
        (circle 
          (mul 5 v) 
          (mul 5 v) 
          (mul 5 v)) "red" 1) 
      (rec 
        (sub v 5))))) 
(rec 100)