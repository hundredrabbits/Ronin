; scale file
(
  ; Filter

  (def filter-action 
    (lambda () (pixels 
      (frame)
      saturation
      0.5)
    ))

(open (path "/Users/VillaMoirai/Desktop/clip.jpg") filter-action)
)