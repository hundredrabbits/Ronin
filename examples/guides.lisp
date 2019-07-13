; guides file

((clear)
  (stroke (frame) 1 "red")

  (stroke 
    (line 
      (pos 0 0) 
      (pos (of (frame) "w") (of (frame) "h"))) 
    1 "red")


  (stroke 
    (line 
      (pos (of (frame) "w") 0) 
      (pos 0 (of (frame) "h"))) 
    1 "red")

  (stroke (line (pos 0 0) (pos (of (frame) "w") (of (frame) "h"))) 1 "red")
)