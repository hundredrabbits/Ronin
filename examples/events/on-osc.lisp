;
(defn on-msg 
  (msg) 
  (debug msg))
; trigger
(on "/a" on-msg)