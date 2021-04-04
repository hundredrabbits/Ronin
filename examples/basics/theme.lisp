; display color from the theme.

(def theme 
  (get-theme))
(def frame 
  (get-frame))

; ex: theme:f_high

(clear)
 
(fill frame theme:background)

(def color-box 
  (div frame:h 10))

(defn print-value 
  (item id) 
  (
    (def box-y 
      (add 
        (mul id color-box) 
        (div color-box 2))) 
    (fill 
      (circle color-box box-y 
        (div color-box 2)) item) 
    (fill 
      (text 140 box-y 30 id) theme:f_high) 
    (fill 
      (text 200 box-y 30 
        (of 
          (keys theme) id)) theme:f_high) 
    (fill 
      (text 400 box-y 30 item) theme:f_high)))

(map 
  (values theme) print-value)