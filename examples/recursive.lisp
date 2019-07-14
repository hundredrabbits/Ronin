(
  (clear)
  (def rec 
    (lambda (v)
      (if (gt v 0)
        (
          (stroke (circle
                    (mul 5 v)
                    (mul 5 v)
                    (mul 5 v)) 1 "red")
          (rec (sub v 5))
        )
        (echo "done"))))
  (rec 100)
)