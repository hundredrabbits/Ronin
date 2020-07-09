; this demo shows how to use the animate event to animate lines into a sine wave.

;
(def seg-count 50)
; 
(def seg-width 
  (div frame:w seg-count))
;
(defn elevation 
  (i) 
  (add 
    (mul 
      (sin 
        (add 
          (time 0.001) 
          (div i 5))) 
      (div frame:h 5)) 300))
;
(defn draw-dash 
  (i) 
  (if 
    (gt i 0)
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
          (line 50 0 frame:w 0) 
          ("#ffb545" "#72dec2")) 4) 
      (draw-dash 
        (sub i 1))) ))

;
(defn redraw () 
  (
     
    (clear) 
    (draw-dash seg-count)))

(on "animate" redraw)
