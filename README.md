#Ronin

##Canvas
```
@ 600x400                         ; New canvas of size 600w and 400h
@ 100x100 #ff0000                 ; New canvas of size 100w and 100h with red background
@ ?                               ; Clear canvas
```

##History*
```
~                                 ; Keep image progress
~ 3                               ; Keep image progress into temporary memory with id 3
~ ?                               ; Clear history
```

##Save File
```
$ new_name.jpg                    ; Create a new file with name
```

##Load File
```
/ dir/file_name.jpg 10,10 100x100 ; Load image, at 10,10 with size 100x100
/ dir/file_name.jpg 10,10 100x    ; Load image, at 10,10 with size 100w and auto height
/ ~                               ; Load last history id
/ 3                               ; Load history id
```

##Brush
```
& 10                              ; Size 10
& -4                              ; Eraser, Size 4
& 4 #ff0000                       ; Red brush, Size 4
& ?                               ; Size 1, black
```

##Pointers
```
> 10,0                            ; Add pointer at pos
> 0,0 400,0                       ; Mirror X, at 400px
> ?                               ; Remove pointers
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
5                                 ; 5px
5,7                               ; 5x 7y
7x9                               ; 7w 9h
{5h - 5s}                         ; 5% of canvas width, minus brush speed
```
