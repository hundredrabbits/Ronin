; filesystem
( 
  ; get files 
  (def files 
    (ls 
      (folder))) 
  ; print files count 
  (echo 
    (concat "Current folder: " 
      (folder) " contains " 
      (len files) " files"))))