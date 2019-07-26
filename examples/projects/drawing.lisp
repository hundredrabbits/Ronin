; this demo shows how to use the mouse events to draw make a simple drawing tool.
;
(clear)
;
(def prev-pos {:x 0 :y 0})
;
(defn stroke-color 
  (e) 
  (if 
    (eq e:is-down true) "#ffb545" "#72dec2")) 
;
(defn draw-line 
  (e) 
  (
    (if 
      (eq e:is-down true) 
      (
        (debug e:is-down) 
        (stroke 
          (line prev-pos:x prev-pos:y e:x e:y) 2 "white") 
        (set prev-pos "x" e:x "y" e:y) 
        (debug prev-pos) 
        (debug e)))))
;
(defn draw-circle 
  (e) 
  (
    (debug e) 
    (set prev-pos "x" e:x "y" e:y) 
    (debug e:x) 
    (stroke 
      (circle e:x e:y 10) 4 
      (stroke-color e))))
;
(on "mouse-down" draw-circle)
(on "mouse-up" draw-circle)
(on "mouse-move" draw-line)