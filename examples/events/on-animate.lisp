; this demo shows how to use the animate event to animate lines into a sine wave.
;
(def seg-count 50)
; 
(def frame-middle 
  (div 
    (of 
      (frame) :h) 2)) 
; 
(def seg-width 
  (div 
    (of 
      (frame) :w) seg-count)) 
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
        (of 
          (frame) :h) 5)) frame-middle))
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
      (line 
        (pos x 
          (elevation 
            (sub i 1))) 
        (pos 
          (add x seg-width) 
          (elevation i))) 4 
      (gradient 
        (50 0 
          (of 
            (frame) :w) 0) 
        ("#ffb545" "#72dec2")))))
;
(defn redraw 
  () 
  (
    (clear) 
    (times seg-count draw-dash)))
(on "animate" redraw)