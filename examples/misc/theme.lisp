; theme
; reads color from the theme.
(clear) 
(def col 
  (λ 
    (i) 
    (of 
      (
        (theme "f_high") 
        (theme "f_med") 
        (theme "f_low") 
        (theme "f_inv") 
        (theme "b_high") 
        (theme "b_med") 
        (theme "b_low") 
        (theme "b_inv")) 
      (mod i 8)))) 
(def rec 
  (λ 
    (v i) 
    (if 
      (gt v 0) 
      (
        (fill 
          (circle 
            (add 
              (div 
                (of 
                  (frame) "w") 1.6) 
              (mul 1.5 v)) 
            (mul 10 v) 
            (mul v 
              (div v 5))) 
          (col i)) 
        (rec 
          (sub v 3) 
          (add i 1)))))) 
(rec 40 0)