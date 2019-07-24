(clear)
; drag an image on the window
(open $path)
;
(convolve 
  (rect 100 100 400 400) edge)
(convolve 
  (rect 300 300 400 400) sharpen)
(convolve 
  (rect 500 500 400 400) blur)