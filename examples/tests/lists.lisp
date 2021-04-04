(test "Native last call - list of numbers" 
  (last 
    (1 2 3)) 3)

(test "Native last call - list of numbers, 1 element" 
  (last 
    (1)) 1)

(test "Native last call - list of numbers, no elements"
  (last ()) undefined)

(test "Native last call - list of strings, 1 element" 
  (last 
    ("abc")) "abc")

(test "Native last call - list of strings, many elements" 
  (last 
    ("ala" "bla" "cla")) "cla")

;functions defined as defn/lambda args bodyinstrs...

(defn lastfn 
  (listarg) (debug "some other instruction") 
  (last listarg))

(test "Proxied last call - list of numbers" 
  (lastfn 
    (1 2 3)) 3)

(test "Proxied last call - list of numbers, 1 element" 
  (lastfn 
    (1)) 1)

(test "Proxied last call - list of numbers, no elements"
  (lastfn ()) undefined)

(test "Proxied last call - list of strings, 1 element" 
  (lastfn 
    ("abc")) "abc")

(test "Proxied last call - list of strings, many elements" 
  (lastfn 
    ("ala" "bla" "cla")) "cla")




(test "Lambda last call - list of numbers" 
  ((λ 
  (listarg) (debug "some other instruction")
  (last listarg)) 
    (1 2 3)) 3)

(test "Lambda last call - list of numbers, 1 element" 
  ((λ 
  (listarg) (debug "some other instruction")
  (last listarg)) 
    (1)) 1)

(test "Lambda last call - list of numbers, no elements"
  ((λ 
  (listarg) (debug "some other instruction")
  (last listarg)) ()) undefined)

(test "Lambda last call - list of strings, 1 element" 
  ((λ 
  (listarg) (debug "some other instruction")
  (last listarg)) 
    ("abc")) "abc")

(test "Lambda last call - list of strings, many elements" 
  ((λ 
  (listarg) (debug "some other instruction")
  (last listarg)) 
    ("ala" "bla" "cla")) "cla")



;functions defined as defn/lambda args bodyinstr

(defn lastfn2 
  (listarg)
  (last listarg))

(test "Proxied last call - list of numbers" 
  (lastfn2 
    (1 2 3)) 3)

(test "Proxied last call - list of numbers, 1 element" 
  (lastfn2 
    (1)) 1)

(test "Proxied last call - list of numbers, no elements"
  (lastfn2 ()) undefined)

(test "Proxied last call - list of strings, 1 element" 
  (lastfn2 
    ("abc")) "abc")

(test "Proxied last call - list of strings, many elements" 
  (lastfn2 
    ("ala" "bla" "cla")) "cla")




(test "Lambda last call - list of numbers" 
  ((λ 
  (listarg)
  (last listarg)) 
    (1 2 3)) 3)

(test "Lambda last call - list of numbers, 1 element" 
  ((λ 
  (listarg)
  (last listarg)) 
    (1)) 1)

(test "Lambda last call - list of numbers, no elements"
  ((λ 
  (listarg)
  (last listarg)) ()) undefined)

(test "Lambda last call - list of strings, 1 element" 
  ((λ 
  (listarg)
  (last listarg)) 
    ("abc")) "abc")

(test "Lambda last call - list of strings, many elements" 
  ((λ 
  (listarg)
  (last listarg)) 
    ("ala" "bla" "cla")) "cla")