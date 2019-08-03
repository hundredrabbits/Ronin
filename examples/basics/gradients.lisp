; gradients
(clear)
(def gl 
  (line 0 0 frame:h frame:h))
(def cl1 
  (gradient gl 
    (theme:b_med theme:b_high)))
(def cl2 
  (gradient gl 
    (theme:b_high theme:b_med)))
(guide gl)
(fill 
  (circle frame:m frame:m frame:m) cl1)
(fill 
  (circle frame:m frame:m 
    (mul frame:m 0.75)) cl2)
(fill 
  (circle frame:m frame:m 
    (mul frame:m 0.5)) cl1)