;To inspect the results of these tests,
;open your browser's debugging tools 
;
(usually F12)
 and navigate to the
;JavaScript console.
(clear)

(def mydog 
  (object "color" "gold" "coat" "long" :speed "quick" :health "good"))

(debug mydog)

(test "My dog's color is" 
  (get mydog "color") "gold")

(test "My dog's coat is" 
  (get mydog "coat") "long")

(test "My dog's speed is" 
  (get mydog "speed") "quick")

;the last one passes only because :health
;in the set instruction above 
;resolves to undefined - and
;technically you can have one object value 
;for key=undefined
(test "My dog's health is" 
  (get mydog :health) "good")

;You can, however, use obj:param syntax to 
;get properties of objects.
;A shorthand for 
(get obj "param")
.
;
(test "Get color" mydog:color "gold")

;Also,
(:coat mydog)

;is another shorthand.
(test "Get coat shorthand function" 
  (:coat mydog) "long")