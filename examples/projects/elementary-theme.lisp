(clear)
;
(open $path 0.75)

; picker to elementary

(def unit 10)
(def f 
  (get-frame))
(def pos-row-1 
  (sub f:h 80))
(def pos-row-2 
  (sub f:h 45))

; color picker

(def color-1 
  (pick 
    (guide 
      (rect $xy unit unit))))
(echo color-1)

; display

(fill 
  (circle 
    (mul 20 2) pos-row-1 18) color-1)
