; this demo shows how to use the mouse events to draw make a simple drawing tool.
;
(clear)
;
(def gradient-line 
  (line frame-rect:c 0 frame-rect:c frame-rect:h))
;
(defn draw-circle 
  (e) 
  (
    (stroke 
      (circle e:x e:y e:d) 1 
      (gradient gradient-line 
        ("black" "#ffb545")))))
;
(on "mouse-move" draw-circle)