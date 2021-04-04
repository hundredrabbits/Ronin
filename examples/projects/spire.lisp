; this demo shows how to use the mouse events to draw make a simple drawing tool.

;
(clear)

(def frame (get-frame))

;
(def gradient-line 
  (line frame:c 0 frame:c frame:h))

;
(defn draw-circle 
  (e) 
  (
    (stroke 
      (circle e:x e:y e:d) 
      (gradient gradient-line 
        ("black" "#72dec2")))))

;
(on "mouse-move" draw-circle)