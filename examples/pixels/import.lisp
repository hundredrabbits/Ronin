(clear)
(def hor-path "/Users/VillaMoirai/Desktop/hor.jpeg")
(def ver-path "/Users/VillaMoirai/Desktop/ver.jpg")
; rect
(import hor-path 
  (guide (rect 50 50 300 300)))

(import hor-path 
  (guide (rect 350 50 350 200)))

(import hor-path 
  (guide (line 700 50 1200 350)))

(import hor-path 
  (guide (rect 1200 50 200 300)))

(import ver-path 
  (guide (rect 50 350 300 300)))

(import ver-path 
  (guide (rect 350 350 350 200)))

(import ver-path 
  (guide (line 700 350 1200 700)))

(import ver-path 
  (guide (rect 1200 350 200 300)))
