(clear)

(defn print-file 
  (name index) 
  (fill 
    (text 0 
      (add 
        (mul index 40) 50) 40 name) "red"))

(each 
  (files) print-file)