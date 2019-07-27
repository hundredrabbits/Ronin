; stars
(clear)
; times
(defn times 
  (v f) 
  (
    (f v) 
    (if 
      (gt v 1) 
      (times 
        (sub v 1) f))))
; convert deg to radians
(defn deg-rad 
  (deg) 
  (mul deg 
    (div PI 180)))
; position on a circle from angle
(defn circle-pos 
  (cx cy r a) {:x 
  (add cx 
    (mul r 
      (cos a))) :y 
  (add cy 
    (mul r 
      (sin a)))})
; draw
(defn draw-spoke 
  (cx cy r a) 
  (
    (stroke 
      (line cx cy (:x (circle-pos cx cy r a)) (:y (circle-pos cx cy r a))
        ) "white" 2)))
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
        (random 100 frame-rect:w) 
        (random 100 frame-rect:h) 
        (random 10 100) 
        (floor 
          (random 3 32))))))