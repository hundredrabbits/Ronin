; animated recusive spiral

(def frame 
  (get-frame))

;
(defn rec 
  (v) 
  (if 
    (gt v 0) 
    ( 
      ; params 
      (def spiral-x 
        (add frame:c 
          (mul 
            (cos 
              (add 
                (div v 17) 
                (time 0.001))) 
            (div v 2)))) 
      (def spiral-y 
        (add frame:m 
          (mul 
            (sin 
              (div v 11)) 
            (div v 2)))) 
      (def spiral-r 
        (div v 2)) 
      ; draw 
      (stroke 
        (circle spiral-x spiral-y spiral-r) 
        (color 114 222 194 0.1) 1) 
      (rec 
        (sub v 0.3)))))
 
;
(defn redraw () 
  
    (clear) 
    (rec 300))

;
(on "animate" redraw)