; stars
(clear)
;
(defn deg-rad 
  (deg) 
  (mul deg 
    (div PI 180)))
; 
(defn circle-pos 
  (cx cy r a) {:x 
  (add cx 
    (mul r 
      (cos a))) :y 
  (add cy 
    (mul r 
      (sin a)))})
;
(defn draw-spoke 
  (cx cy r a) 
  (
    (stroke 
      (line 
        (pos cx cy) 
        (circle-pos cx cy r a)) 2 "white")))
;
(defn draw-star 
  (cx cy r c) 
  (
    (times c 
      (lambda 
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