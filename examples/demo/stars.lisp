; stars
(clear)
;
(defn draw-spoke 
  (cx cy r a) 
  (
    (stroke 
      (line cx cy (of (circle-pos cx cy r a) :x) (of (circle-pos cx cy r a) :y)
        ) 2 "white")))
;
(defn draw-star 
  (cx cy r c) 
  (
    (times c 
      (λ 
        (i) 
        (
          (draw-spoke cx cy r 
            (deg-rad 
              (mul i 
                (div 360 c)))))))))
; main
(times 100 
  (λ 
    () 
    (
      (draw-star 
        (random 100 
          (of 
            (frame) :w)) 
        (random 100 
          (of 
            (frame) :h)) 
        (random 10 100) 
        (floor 
          (random 3 32))))))