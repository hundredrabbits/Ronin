; objects
(def box {:x 90 :y 0 :vy 0 :vx 5 :w 20 :h 20})
(def floor {:x 225 :y 580 :vx 0 :vy 0 :w 130 :h 40 :hit false})
(def boundaries {:max-x 560 :min-x 10 :max-y 800})
(def walls 
  (rect boundaries:min-x 10 boundaries:max-x 640))
; "physics"
(def gravity .2)
(def friction .99)
(def elastic-coefficient 1.1)
(def player-friction .90)
(def player-velocity 1.2)
; controls
(def controls {:left false, :right false})
(def commands 
  ({:key "ArrowRight" :type "keydown" :direction "right" :activate true} {:key "ArrowRight" :type "keyup" :direction "right" :activate false} {:key "ArrowLeft" :type "keydown" :direction "left" :activate true} {:key "ArrowLeft" :type "keyup" :direction "left" :activate false}))
;
(def state {:score 0})
;
(defn rect-colliding 
  (r1 r2) 
  (and 
    (lt r1:x 
      (add r2:x r2:w)) 
    (gt 
      (add r1:x r1:w) r2:x) 
    (lt r1:y 
      (add r2:y r2:h)) 
    (gt 
      (add r1:y r1:h) r2:y )))
;
(defn check-collisions 
  (b floor) 
  (
    (set floor "hit" false) 
    (if 
      (rect-colliding b floor) 
      (
        (set floor "hit" true) 
        (set b "y" 
          (sub floor:y box:h)) 
        (set b "vy" 
          (mul b:vy -1)) 
        (set b "vy" 
          (mul b:vy elastic-coefficient))))))
;
(defn move-ball 
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
;
(defn check-reset-ball 
  (b) 
  (
    (if 
      (gt box:y boundaries:max-y) 
      (reset))))
;
(defn draw 
  () 
  (
    (clear) 
    ;score 
    (fill 
      (text 35 110 100 
        (concat "" state:score) "left" "monospace") "white" 3) 
    ;draw-walls 
    (stroke walls "white") 
    ;draw-floor 
    (stroke 
      (rect floor:x floor:y floor:w floor:h) "white") 
    (if 
      (eq floor:hit true) 
      (fill 
        (rect floor:x floor:y floor:w floor:h) "white")) 
    ;draw-box 
    (fill 
      (rect box:x box:y box:w box:h) "white")))
;
(defn reset 
  () 
  (
    (set box "y" -100) 
    (set state "score" 
      (add state:score 1))))
;
(defn on-hit-boundary 
  (thing on-hit-left on-hit-right) 
  (
    (if 
      (gt 
        (add thing:x thing:w) boundaries:max-x) 
      (on-hit-right)) 
    (if 
      (lt thing:x boundaries:min-x) 
      (on-hit-left))))
;
(defn move-player 
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
      (add floor:x floor:vx)) 
    (set p "vx" 
      (mul p:vx player-friction))))
;
(defn invert-vx 
  (thing pos) 
  (
    (set thing "vx" 
      (mul thing:vx -1)) 
    (set thing "x" pos))) 
;
(defn move 
  () 
  (
    (move-player floor) 
    (move-ball box) 
    (check-collisions box floor) 
    (check-reset-ball box) 
    (on-hit-boundary box 
      '(invert-vx box boundaries:min-x) 
      '(invert-vx box 
        (sub boundaries:max-x box:w))) 
    (on-hit-boundary floor 
      '(invert-vx floor boundaries:min-x) 
      '(invert-vx floor 
        (sub boundaries:max-x floor:w)))))
;
(defn update 
  () 
  (
    (move) 
    (draw)))
;
; 
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
;
(on "animate" update)
(on "key-down" handle-key)
(on "key-up" handle-key)"key-up" handle-key)