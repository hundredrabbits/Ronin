; Render script for a6000
(clear) 
(def photo-rect 
  (rect 0 0 
    (div 4240 2) 
    (div 2400 2)))
(resize photo-rect:w photo-rect:h)
(import $path photo-rect)
(pixels normalize 
  (pick photo-rect))
(export "export" "image/jpeg" 0.9)