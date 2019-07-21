; basics

; define a variable 
(def a 25) 
(echo a) 

; define a function 
(defn add-two (a) (add 2 a)) 
(echo (add-two 4))

; use a lambda
(times 5 
  (λ (a) (echo (concat "time:" a))))