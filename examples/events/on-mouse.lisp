; this demo shows how to use the mouse events.
;
(defn redraw 
  (e) 
  (
    (clear) 
    ; vertical line 
    (stroke 
      (line 
        (pos 
          (of e :x) 0) e) 2 "#ff0000") 
    ; horizontal line 
    (stroke 
      (line 
        (pos 0 
          (of e :y)) e) 2 "#72dec2") 
    ; circle 
    (stroke 
      (circle 
        (of e :x) 
        (of e :y) 30) 2 "#ffffff")))
;
(on "mouse-down" redraw)
(on "mouse-up" redraw)
(on "mouse-move" redraw)