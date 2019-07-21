;
(clear)
;
(def seg-count 20)
; 
(def center 
  (div 
    (of 
      (frame) :h) 2)) 
; 
(def seg-width 
  (div 
    (of 
      (frame) :w) count)) 
;
(defn draw-dash 
  (i) 
  (
    (def x 
      (mul 
        (sub i 1) seg-width)) 
    (def y 
      (add 
        (mul 
          (sin 
            (add 
              (time 0.01) i)) 15) center)) 
    (stroke 
      (line 
        (pos x y) 
        (pos 
          (add x seg-width) y)) 4 "red")))
;
(times seg-count draw-dash)