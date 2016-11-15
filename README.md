#Ronin

##Canvas
```
@ 600x400                         ; New canvas of size 600w and 400h
@ 100x100 #ff0000                 ; New canvas of size 100w and 100h with red background
@ ?                               ; Clear canvas
```

##Save File
```
$ new_name                        ; Create a new file with name
$ 3                               ; Save to temporary storage, accessible with Load
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
> ?                               ; Remove last pointer
```

##Guides
```
| 10,10 100x100                   ; Draw a guide
| -100,0                          ; Draw a grid at every 100px
| ?                               ; Remove guides
```

##Translate*
```
^ 0,10                            ; Translate 10px vertically
^ 20,20 100x100 40,40             ; Translate a specific portion to a specific location
```

##Zoom*
```
= 75                              ; Zoom factor
= ?                               ; Zoom 100%
```

##Layers*
```
# 3                               ; Layer 3
# ?                               ; Layer 1
```

#Units*
```
5                                 ; value:    5
5,7                               ; position: 5x 7y
7x9                               ; rect:     7w 9h
#ff0000                           ; color:    red
```

- Mirror
- Filter
- Noise
-
