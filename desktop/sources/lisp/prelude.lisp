(echo "Loading prelude.lisp")

(defn translate 
    (r p)
    (clone 
        r
        (rect 
            (of p :x)
            (of p :y)
            (of r :w)
            (of r :h))))
