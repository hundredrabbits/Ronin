; crop

(
  (clear)

  ; Filter

  (def filter-action 
    (lambda () (crop (rect 100 100 400 400))))

  ; Draw photo 
  
  (open 
    "../../PREVIEW.jpg" 
    filter-action)
)