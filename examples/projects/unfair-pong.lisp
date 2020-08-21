(clear)

; Game Objects
(def ball:x 20)
(def ball:y 0)
(def ball:vy 0)
(def ball:vx 4)
(def ball:w 20)
(def ball:h 20)

(def platform:x 280)
(def platform:y 580)
(def platform:vx 0)
(def platform:vy 0)
(def platform:w 140)
(def platform:h 40)
(def platform:hit false)
(def boundaries:max-x 560)
(def boundaries:min-x 10)
(def boundaries:max-y 800)

(def walls 
  (rect boundaries:min-x 10 boundaries:max-x 640))


; Physics
(def gravity .2)
(def friction .99)
(def elastic-coefficient 1.1)
(def player-friction .90)
(def player-velocity 1)


; Controls
(def right-arrow-1:key "ArrowRight")
(def right-arrow-1:type "keydown")
(def right-arrow-1:direction "right")
(def right-arrow-1:activate true)
(def right-arrow-2:key "ArrowRight")
(def right-arrow-2:type "keyup")
(def right-arrow-2:direction "right")
(def right-arrow-2:activate false)

(def left-arrow-1:key "ArrowLeft")
(def left-arrow-1:type "keydown")
(def left-arrow-1:direction "left")
(def left-arrow-1:activate true)
(def left-arrow-2:key "ArrowLeft")
(def left-arrow-2:type "keyup")
(def left-arrow-2:direction "left")
(def left-arrow-2:activate false)

(def commands 
  (right-arrow-1 right-arrow-2 left-arrow-1 left-arrow-2))

; Game State: 
(def controls:left false)
(def controls:right false)
(def state:score 0)

(defn rect-colliding 
  "Detect if there is a collision between two rectangles."
  (r1 r2) 
  (and 
    (lt r1:x 
      (add r2:x r2:w)) 
    (gt 
      (add r1:x r1:w) r2:x) 
    (lt r1:y 
      (add r2:y r2:h)) 
    (gt 
      (add r1:y r1:h) r2:y)))

(defn check-collisions 
  "Update ball and platform states on collision."
  (b platform) 
  (
    (set platform "hit" false) 
    (if 
      (rect-colliding b platform) 
      (
        (set platform "hit" true) 
        (set b "y" 
          (sub platform:y ball:h)) 
        (set b "vy" 
          (mul b:vy -1)) 
        (set b "vy" 
          (mul b:vy elastic-coefficient))))))

(defn move-ball 
  "Update the state of the ball"
  (b) 
  (
    (set b "vy" 
      (mul b:vy friction)) 
    (set b "vy" 
      (add b:vy gravity)) 
    (set b "y" 
      (add b:y b:vy)) 
    (set b "x" 
      (add b:x b:vx))))

(defn check-reset-ball 
  "Reset the position of the ball and increment score."
  (b) 
  (
    (if 
      (gt b:y boundaries:max-y) 
      (
        (set b "y" -100) 
        (set state "score" 
          (add state:score 1))))))

(defn draw 
  "Main drawing loop for world elements."
  () 
  (
    (clear) 
    ;score 
    (fill 
      (text 35 110 100 
        (concat "" state:score) "left" "monospace") "white" 3) 
    ;draw-walls 
    (stroke walls "white") 
    ;draw-platform 
    (stroke 
      (rect platform:x platform:y platform:w platform:h) "white") 
    (if 
      (eq platform:hit true) 
      (fill 
        (rect platform:x platform:y platform:w platform:h) "white")) 
    ;draw-ball 
    (fill 
      (rect ball:x ball:y ball:w ball:h) "white")))


(defn on-hit-boundary 
  "On boundary hit call provided functions."
  (thing on-hit-left on-hit-right) 
  (
    (if 
      (gt 
        (add thing:x thing:w) boundaries:max-x) 
      (on-hit-right)) 
    (if 
      (lt thing:x boundaries:min-x) 
      (on-hit-left))))


(defn move-player 
  "Update the position of the player controlled platform"
  (p) 
  (
    (if 
      (eq controls:right true) 
      (
        (set p "vx" 
          (add p:vx player-velocity)))) 
    (if 
      (eq controls:left true) 
      (
        (set p "vx" 
          (sub p:vx player-velocity)))) 
    (set p "x" 
      (add p:x p:vx)) 
    (set p "vx" 
      (mul p:vx player-friction))))


(defn invert-vx 
  (thing pos) 
  (
    (set thing "vx" 
      (mul thing:vx -1)) 
    (set thing "x" pos)))
 

(defn move 
  "Update position and velocities for all elements."
  () 
  (
    (move-player platform) 
    (move-ball ball) 
    (check-collisions ball platform) 
    (check-reset-ball ball) 
    (on-hit-boundary ball 
      (λ () 
        (invert-vx ball boundaries:min-x)) 
      (λ () 
        (invert-vx ball 
          (sub boundaries:max-x ball:w)))) 
    (on-hit-boundary platform 
      (λ () 
        (invert-vx platform boundaries:min-x)) 
      (λ () 
        (invert-vx platform 
          (sub boundaries:max-x platform:w))))))


(defn update 
  "Main update loop"
  () 
  (
    (move) 
    (draw)))


(defn handle-key 
  (e) 
  (
    (each commands 
      (λ 
        (p) 
        (if 
          (and 
            (eq e:key p:key) 
            (eq e:type p:type)) 
          (set controls p:direction p:activate))))))


(on "animate" update)
(on "key-down" handle-key)
(on "key-up" handle-key)
