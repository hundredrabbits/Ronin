; benchmark

(
; Basics

  (test "add" (add 8 4 2) 14)
  (test "sub" (sub 8 4 2) 2)
  (test "mul" (mul 8 4 2) 64)
  (test "div" (div 8 4 2) 1)

; Others

  (test "mod" (mod 6 4) 2)
  (test "clamp" (clamp 12 4 8) 8)
  (test "step" (step 12 10) 10)
)