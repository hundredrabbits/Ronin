; objects

(test "symbols" :a "a")

(def ob {:a "fantastic" :b 2})

((of (js) :console :log) ob)

(echo (of ob :a))

(echo (keys ob))
(echo (values ob))

(set ob :a 4)
(echo (of ob :a))

(echo (map '(add %1 2) (4 5 6))
