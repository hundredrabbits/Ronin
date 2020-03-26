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
      (rect 846 220 unit unit))))
(def color-2 
  (pick 
    (guide 
      (rect 584 364 unit unit))))
(def color-3 
  (pick 
    (guide 
      (rect 70 538 unit unit))))
(def color-4 
  (pick 
    (guide 
      (rect 468 650 unit unit))))
(def color-5 
  (pick 
    (guide 
      (rect 254 246 unit unit))))
(def color-6 
  (pick 
    (guide 
      (rect 190 502 unit unit))))
(def color-7 
  (pick 
    (guide 
      (rect 1084 446 unit unit))))
(def color-8 
  (pick 
    (guide 
      (rect 1068 730 unit unit))))

; display

(fill 
  (circle 
    (mul 20 2) pos-row-1 18) color-1)
(fill 
  (circle 
    (mul 20 4) pos-row-1 18) color-2)
(fill 
  (circle 
    (mul 20 6) pos-row-1 18) color-3)
(fill 
  (circle 
    (mul 20 8) pos-row-1 18) color-4) 
(fill 
  (circle 
    (mul 20 3) pos-row-2 18) color-5)
(fill 
  (circle 
    (mul 20 5) pos-row-2 18) color-6)
(fill 
  (circle 
    (mul 20 7) pos-row-2 18) color-7)
(fill 
  (circle 
    (mul 20 9) pos-row-2 18) color-8)
;
(def res 
  (add color-1:hex ":" color-2:hex ":" color-3:hex ":" color-4:hex ":" color-5:hex ":" color-6:hex ":" color-7:hex ":" color-8:hex))
(echo 
  (add res res))