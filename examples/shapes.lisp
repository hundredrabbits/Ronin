; Shapes

((clear)

  ; variables
  (def center-w (div (of (frame) "w") 2))
  (def center-h (div (of (frame) "h") 2))
  (def rad (div (of (frame) "h") 4))
  
  ; draw circle
  (stroke 
    (circle center-w center-h rad) 2 "red")

  ; draw rect
  (stroke 
    (rect 
      (sub center-w rad) (sub center-h rad) center-h center-h) 2 "red")

  ; draw line
  (stroke 
    (line 
      (pos (sub center-w rad) center-h)
      (pos (add center-w rad) center-h)))
  )