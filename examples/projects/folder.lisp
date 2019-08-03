; open every file in a folder.
(defn filter-jpg 
  (file-name) 
  (eq 
    (last 
      (split file-name ".")) "jpg"))
;
(def images 
  (filter 
    (dir) filter-jpg))
;
(debug 
  (concat "Found: " 
    (len images)))
;
(defn image-operation 
  (file-name) 
  (
    (def file-path 
      (concat 
        (dirpath) "/" file-name)) 
    (open file-path)))
;
(each images image-operation)