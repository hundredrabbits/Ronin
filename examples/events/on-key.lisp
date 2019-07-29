; this demo shows how to use the key events.
;
(clear)
;
(defn draw-title 
  () 
  (fill 
    (text 30 80 50 "press key") "grey" 2))
;
(defn show-letter 
  (e) 
  (a
    (clear) 
    (draw-title)
    (fill 
      (text 30 170 50 (concat e:key " — " e:type)) "orange" 2)))
;
(draw-title)
;
(on "key-down" show-letter)
(on "key-up" show-letter)
(on "key-press" show-letter)
