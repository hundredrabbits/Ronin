(clear)
; drag an image
(import $path)
(def original (copy))
(defn update 
  (e) 
  (if 
    (eq e:is-down true) 
    (
      (paste original) 
      (def val (div e:x 400)) 
      (pixels saturation val) 
      (guide (line e:x 0 e:x 900)) 
      (fill (text 88 580 40 val) "white"))))
; add interaction
(on "mouse-move" update)