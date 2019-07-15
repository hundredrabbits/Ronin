; pixels

(
  (clear)

  ; Filter

  (def filter-action 
    (lambda () (pixels 
      (rect 0 0 500 500)
      saturation
      0.5)
    ))

  ; Draw photo 
  
  (draw 
    "../../PREVIEW.jpg" 
    (frame) 
    filter-action)
)