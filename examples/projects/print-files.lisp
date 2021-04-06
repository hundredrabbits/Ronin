(clear)

(defn print-file 
  (name index) 
  (fill 
    (text 0 
      (add 
        (mul index 40) 50) 40 name) "red"))

;this will display the list of loaded files.
;drag a few pictures into Ronin, then eval
;this script again.
(each 
  (files) print-file)