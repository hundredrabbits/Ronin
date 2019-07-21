(clear)
(def x (of (osc "/test") "args" "0" "value"))
(def y (of (osc "/test") "args" "1" "value"))
(def r (of (osc "/test") "args" "2" "value"))

(fill 
(circle x y r)
"red")
(stroke 
(circle x y r)
5 "white")
