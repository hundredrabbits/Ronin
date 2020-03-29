(resize 600 200)

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

(echo 
  (get picked-colors:1 "hex"))