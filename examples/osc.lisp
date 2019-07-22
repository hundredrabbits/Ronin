(defn on-msg 
  (msg) 
  (
    (clear) 
    (def msg-value 
      (of 
        (first msg) :value)) 
    (stroke 
      (circle 300 300 150) 2 
      (if 
        (eq msg-value 1) "#ffb545" "#72dec2" ))))
; trigger
(on "/a" on-msg)