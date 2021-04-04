(clear)

(def theme 
  (get-theme))

(def frame 
  (get-frame))

(defn branch 
  (v) 
  (if 
    (gt v 0) 
    (
      (transform:scale 0.95) 
      (stroke 
        (line 0 0 100 100) theme:b_high 2) 
      (transform:move 100 100) 
      (transform:push) 
      (transform:rotate 
        (div v 50)) 
      (branch 
        (sub v 1)) 
      (transform:pop) 
      (transform:push) 
      (transform:rotate 
        (div v -50)) 
      (branch 
        (sub v 1)) 
      (transform:pop))))

(branch 10)

(transform:reset)