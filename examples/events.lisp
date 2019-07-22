(clear)
;
(def prev-pos {:x 0 :y 0})
;
(defn draw-line 
  (e) 
  (
    (debug e) 
    (debug prev-pos) 
    (if 
      (of e :is-down) 
      (
        (stroke 
          (line prev-pos e) 2 "white")
        (set prev-pos :x 
          (of e :x))
        (set prev-pos :y 
          (of e :y))))))
;
(defn draw-circle 
  (e) 
  (
    (debug e) 
    (debug 
      (of e :type)) 
    (def stroke-color 
      (if 
        (eq 
          (of e :type) "mouse-down") "red" "#72dec2")) 
    (stroke 
      (circle 
        (of e :x) 
        (of e :y) 10) 4 stroke-color)))
;
(on "mouse-down" draw-circle)
(on "mouse-up" draw-circle)
(on "mouse-move" draw-line)