(resetTransform)
(clear)

(defn branch
  (v)
  (if
    (gt v 0)
    (
        (scale 0.95)
        (stroke
          (line (pos 0 0) (pos 100 100))
          10 "white")
        (move 100 100)
        (pushTransform)
        (rotate (div v 50))
        (branch (sub v 1))
        (popTransform)
        (pushTransform)
        (rotate (div v -50))
        (branch (sub v 1))
        (popTransform)
    )
  )
)
(branch 10)