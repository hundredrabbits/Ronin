(clear)
;
(open $path)

; picker to elementary

(def unit 40)
(def f 
  (get-frame))
(def pos-row-1 
  (sub f:h 
    (mul unit 4)))
(def pos-row-2 
  (sub f:h 
    (mul unit 2)))

; color picker

(def color-1 
  (pick 
    (guide 
      (rect $xy unit unit))))
(def color-2 
  (pick 
    (guide 
      (rect $xy unit unit))))
(def color-3 
  (pick 
    (guide 
      (rect $xy unit unit))))
(def color-4 
  (pick 
    (guide 
      (rect $xy unit unit))))
(def color-5 
  (pick 
    (guide 
      (rect $xy unit unit))))
(def color-6 
  (pick 
    (guide 
      (rect $xy unit unit))))
(def color-7 
  (pick 
    (guide 
      (rect $xy unit unit))))
(def color-8 
  (pick 
    (guide 
      (rect $xy unit unit))))

; display

(fill 
  (circle 
    (mul unit 2) pos-row-1 unit) color-1)
(fill 
  (circle 
    (mul unit 4) pos-row-1 unit) color-2)
(fill 
  (circle 
    (mul unit 6) pos-row-1 unit) color-3)
(fill 
  (circle 
    (mul unit 8) pos-row-1 unit) color-4) 
(fill 
  (circle 
    (mul unit 3) pos-row-2 unit) color-5)
(fill 
  (circle 
    (mul unit 5) pos-row-2 unit) color-6)
(fill 
  (circle 
    (mul unit 7) pos-row-2 unit) color-7)
(fill 
  (circle 
    (mul unit 9) pos-row-2 unit) color-8)
;
(def res 
  (add color-1:hex ":" color-2:hex ":" color-3:hex ":" color-4:hex ":" color-5:hex ":" color-6:hex ":" color-7:hex ":" color-8:hex))
(echo 
  (add res res))