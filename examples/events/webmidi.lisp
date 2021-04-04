;A simple MIDI visualiser
;showing activity per note
;and channel.

(clear)

(def theme 
  (get-theme))

(resize 1200 600)

(def maxcirclesize 50)

(def mincirclesize 20)

(def circlexdist 40)

(def circleydist 30)

(def notes 
  (object 0 "A" 1 "A#" 2 "B" 3 "C" 4 "C#" 5 "D" 6 "D#" 7 "E" 8 "F" 9 "F#" 10 "G" 11 "G#"))

(def sharpnotes 
  (object 1 "A#" 4 "C#" 6 "D#" 9 "F#" 11 "G#"))

(def frame 
  (get-frame))

(def jswindow 
  (js))

(defn isblackkey 
  (num) 
  (def distfromA0 
    (sub num 21)) 
  (def semitonenum 
    (mod distfromA0 12)) 
  (not 
    (eq 
      (get sharpnotes semitonenum) undefined)))

(defn circlebynotenum 
  (num) 
  (circle 
    (mul 
      (sub num 47) circlexdist) 
    (if 
      (isblackkey num) circleydist 
      (mul 2.5 circleydist)) mincirclesize))

(def reactivecircles 
  (reduce 
    (range 48 76) 
    (λ 
      (acc num index) 
      (set acc num 
        (circlebynotenum num))) 
    (object)))

(def channelcircles 
  (map 
    (range 0 15) 
    (λ 
      (num) 
      (circle 
        (add 
          (mul num circlexdist 1.25) circlexdist) 200 mincirclesize))))

(defn js-exec 
  (obj fname listargs) 
  (def boundfunction 
    (js-bind 
      (get obj fname) obj)) 
  (def result 
    (apply boundfunction 
      (if 
        (eq listargs undefined) () listargs))) result)

(defn midimsghandler 
  (midiMessage) 
  (def eventType 
    (get 
      (:data midiMessage) "0")) 
  ;zero based 
  (def channelNum 
    (logand eventType 15)) 
  ;ignore clock in debug to keep things cleaner 
  (if 
    (not 
      (eq eventType 248)) 
    (debug "incoming MIDI:" "CH" channelNum 
      (:data midiMessage))) 
  (def noteNum 
    (get 
      (:data midiMessage) "1")) 
  (def noteVelocity 
    (get 
      (:data midiMessage) "2")) 
  (set 
    (get channelcircles channelNum) "r" 
    (add mincirclesize 
      (mul 
        (sub maxcirclesize mincirclesize) 
        (div noteVelocity 100)))) 
  (set 
    (or 
      (get reactivecircles noteNum)()) "r" 
    (add mincirclesize 
      (mul 
        (sub maxcirclesize mincirclesize) 
        (div noteVelocity 100)))))

(defn midiokhandler 
  (midiAccess) 
  (def midiInputs 
    (js-exec 
      (:inputs midiAccess) "values")) 
  (eachof midiInputs 
    (λ 
      (input id) 
      (debug "Setting listener on" 
        (:name input) 
        (:manufacturer input)) 
      (set input "onmidimessage" midimsghandler))))

(defn midierrhandler 
  (err) 
  (debug "midierrhandler" err))
 
(js-exec 
  (js-exec 
    (:navigator jswindow) "requestMIDIAccess") "then" 
  (list midiokhandler midierrhandler))

(defn drawcircle 
  (arglist) 
  (def notenum 
    (first arglist)) 
  (def i 
    (last arglist)) 
  (if 
    (gt 
      (:r i) mincirclesize) 
    (set i "r" 
      (sub 
        (:r i) 0.6))) 
  (fill i 
    (if 
      (isblackkey notenum) 
      (theme:f_med) 
      (theme:f_low))))

(defn redraw () 
  (clear) 
  (each 
    (entries reactivecircles) drawcircle) 
  (each channelcircles 
    (λ 
      (s i) 
      (fill s theme:b_high) 
      (fill 
        (text 
          (sub s:cx mincirclesize) 
          (add s:cy mincirclesize 18) 18 
          (concat "CH" i)) theme:b_inv 2))))

;
(on "animate" redraw)