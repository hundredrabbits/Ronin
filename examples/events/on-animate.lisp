; this demo shows how to use the animate event to animate lines into a sine wave.
;
(def seg-count 50)
; 
(def frame-middle 
  (div 
    frame-rect:h 2)) 
; 
(def seg-width 
  (div 
    frame-rect:w seg-count)) 
;
(defn elevation 
  (i) 
  (add 
    (mul 
      (sin 
        (add 
          (time 0.001) 
          (div i 5))) 
      (div 
        frame-rect:h 5)) frame-middle))
;
(defn draw-dash 
  (i) 
  (
    (def x 
      (mul 
        (sub i 1) seg-width)) 
    (def y 
      (elevation i)) 
    (stroke 
      (line x 
        (elevation 
          (sub i 1)) 
        (add x seg-width) 
        (elevation i))
      (gradient 
        (line 50 0 
          frame-rect:w 0) 
        ("#ffb545" "#72dec2")) 4 )))
;
(defn redraw 
  () 
  (
    (clear) 
    (times seg-count draw-dash)))
(on "animate" redraw)