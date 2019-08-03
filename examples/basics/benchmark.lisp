; benchmark
; this file is used to test the library.

; Basics

  (test "add" (add 8 4 2) 14)
  (test "sub" (sub 8 4 2) 2)
  (test "mul" (mul 8 4 2) 64)
  (test "div" (div 8 4 2) 1)

; Others

  (test "mod" (mod 6 4) 2)
  (test "clamp" (clamp 12 4 8) 8)
  (test "step" (step 12 10) 10)
  (test "PI" TWO_PI (mul 2 PI))

; Logic

  (test "lt" (lt 3 4) true)
  (test "gt" (gt 3 4) false)

  (test "and - true" (and 1 2 true 4) 4)
  (test "and - false" (and 1 false 2) false)
  (test "or - true" (or false false 2 false) 2)

  (test "if - branch 1" (if (gt 3 2) ("branch 1") ("branch 2")) "branch 1")
  (test "if - branch 2" (if (lt 3 2) ("branch 1") ("branch 2")) "branch 2")
  (test "if - no else" (if (lt 3 2) ("branch 1")) ())

; Arrays

  (test "first" (first ("a" "b" "c")) "a")
  (test "rest" (rest ("a" "b" "c")) ("b" "c"))
  (test "last" (last ("a" "b" "c")) "c")
  (test "range simple" (range 0 4) (0 1 2 3 4))
  (test "range with step" (range 0 4 2) (0 2 4))
  (test "range with negative step" (range 0 -4 -1) (0 -1 -2 -3 -4))
  (test "map" (map (1 2 3) (λ (a) (add 1 a))) (2 3 4))
  (test "filter" (filter (2 3 4 5 6) (λ (a) (eq 0 (mod a 2)))) (2 4 6))
  (test "reduce" (reduce (1 2 3) (λ (acc val) (add acc val)) 4) 10)

; Scope

  (def aaa 123)
  (def addOne (λ (a) (add a 1)))
  (test "def - value" aaa 123)
  (test "def - func" (addOne 4) 5)
  (defn addTwo (a) (add 2 a))
  (test "defn" (addTwo 4) 6)
  (defn mulTwo "multiplies by two" (a) (mul 2 a))
  (test "docstring" (mulTwo 4) 8)

; Generics

  (test "concat" (concat 1 4 "-" (add 3 4) ".jpg") "14-7.jpg")

; Interop
  (test "interop" ((of (of (js) "Math") "max") 2 4) 4)
  (test "recursive key selector" ((of (js) "Math" "max") 2 4) 4)

; fs

; filesystem

(echo (filepath))
(echo (dirpath))
(echo (file))
(echo (dir))
