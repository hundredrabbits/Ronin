; gradients

(def frame 
  (get-frame))

(clear)

(def colors 
  ("#72dec2" "#ffffff"))

(def gradient1 
  (gradient 
    (line 0 0 frame:h frame:h) colors))

(def gradient2 
  (gradient 
    (line frame:h frame:h 0 0) colors))

(fill 
  (circle frame:m frame:m frame:m) gradient1)

(fill 
  (circle frame:m frame:m 
    (mul frame:m 0.75)) gradient2)

(fill 
  (circle frame:m frame:m 
    (mul frame:m 0.5)) gradient1)