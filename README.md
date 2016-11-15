#Ronin

##Canvas
```
@ 600x400                         ; New canvas of size 600w and 400h
@ 100x100 #ff0000                 ; New canvas of size 100w and 100h with red background
@ !                               ; Clear canvas
```

##Save File
```
$ new_name                        ; Create a new file with name
$ 3                               ; Save to temporary storage, accessible with Load
$ !                               ; Clear temporary storage
```

##Load File
```
/ dir/file_name.jpg 10,10 100x100 ; Load image, at 10,10 with size 100x100
/ dir/file_name.jpg 10,10 100x    ; Load image, at 10,10 with size 100w and auto height
/ 3                               ; Load temporary storage id
```

##Brush(Pointers)
```
> 10                              ; Size 10
> -4                              ; Eraser, Size 4
> 10,0                            ; Add pointer at pos
> 400x0                           ; Add mirror pointer, at 400x
> 4 #ff0000                       ; Red brush, Size 4
> !                               ; Remove all pointers
```

##Guides
```
| 10,10 100x100                   ; Draw a guide
| -100,0                          ; Draw a grid at every 100px
| !                               ; Remove all guides
```

##Filters*
```
: saturation 0.5                  ; Set image saturation to 0.5
: balance red 0.9 0.4 0.7         ; Set color balance red to 0.9 0.4 0.7
: balance white 0.7 0.7 0.7       ; Set color balance white to 0.7 0.7 0.7
: sharpen 0.5                     ; Sharpen image to 50%
```

##Translate*
```
^ 0,10                            ; Translate 10px vertically
^ 20,20 100x100 40,40             ; Translate a specific portion to a specific location
^ -1280x800                       ; Flip image horizontally
```

##Zoom*
```
= 75                              ; Zoom factor of 75%
= !                               ; Zoom 100%
```

##Layers*
```
# 3                               ; Layer 3
# !                               ; Layer 1
```

#Units*
```
5                                 ; value:    5
5,7                               ; position: 5x 7y
7x9                               ; rect:     7w 9h
#ff0000                           ; color:    red
?5                                ; random:   0..5
45'                               ; degree:   45/365
```