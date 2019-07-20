; filesystem
( 
  ; get files 
  (def files 
    (ls 
      (folder))) 
  ; pick a random file 
  (def random-index 
    (floor 
      (random 
        (len files)))) 
  ; print random file name
  (echo 
    (get files random-index)))