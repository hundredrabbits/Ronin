; pixels

(
  (clear)

  ; Filter

  (def filter-action 
    (lambda () (resize 0.5 0.5)))

  ; Draw photo 
  
  (open 
    "../../PREVIEW.jpg" 
    filter-action)
)