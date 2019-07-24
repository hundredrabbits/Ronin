; this demo shows how to use the mouse events.
(defn redraw 
  (e) 
  (
    (clear) 
    ; vertical line 
    (stroke (line (of e :x) 0 (of e :x) (of e :y)) 2 "#ff0000") 
    ; horizontal line 
    (stroke 
      (line 0 (of e :y) (of e :x) (of e :y)) 2 "#72dec2") 
    ; circle 
    (stroke 
      (circle 
        (of e :x) 
        (of e :y) 30) 2 "#ffffff")))
;
(on "mouse-down" redraw)
(on "mouse-up" redraw)
(on "mouse-move" redraw)