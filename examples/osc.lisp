;
(def ring 
  (circle 300 300 150))
; 
(defn redraw 
  () 
  (
    (clear) 
    (stroke ring 2 "red")))
;
(defn on-msg 
  (msg) 
  (
    (def msg-value 
      (of 
        (first msg) :value)) 
    (set ring :r 150))) 
; frame
(set ring :r 
  (sub 
    (of ring :r) 1))
(redraw)
; trigger
(on "/a" on-msg)