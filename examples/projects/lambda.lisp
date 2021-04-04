(resize 600 800)

(clear)

(def colors 
  ("#72dec2" "#316067"))

(def picked-colors 
  ("#000" "#000" "#000" "#000" "#000" "#000" "#000" "#000" "#000"))

(fill 
  (rect 0 0 600 200) 
  (gradient 
    (guide 
      (line 0 100 600 100)) colors))

;collect colors to prepared list,
;in particular points from the gradient
;marked by the guides
(each picked-colors 
  (λ 
    (color id) 
    (
      (set picked-colors id 
        (pick 
          (guide 
            (pos 
              (mul id 
                (div 600 9)) 100)))))))

;show picked colors as swatches
(each picked-colors 
  (λ 
    (color id) 
    ( 
      ;swatch circle 
      (fill 
        (circle 
          20 (add (mul id 
            (div 600 9)) 300) 18) color) 
      "black")))

;show picked colors as text
(each picked-colors 
  (λ 
    (color id) 
    ( 
      (fill 
        (text 
          12 (add (mul id 
            (div 600 9)) 300 5) 24 
          (concat id ": " 
            (get 
              (get picked-colors 
                (concat "" id)) "hex"))) "black"))))

;get the first color in different formats
(echo 
  (get picked-colors:0 "hex") 
  (get picked-colors:0 "rgba"))