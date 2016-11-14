#Ronin

##Canvas
```  
@ 100 100                         ; New canvas of size
@ 100 100 ff0000                  ; New canvas with red background
@ ?                               ; Clear canvas
```

##Background
``` 
* ff0000                          ; Fill background with red color
* ?                               ; Remove background
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
/ dir/file_name.jpg 10 10 100 100 ; Load image, at 10,10 with size 100x100
/ dir/file_name.jpg 10 10 100     ; Load image, at 10,10 with size 100w and auto height
/ ~                               ; Load last history id
/ 3                               ; Load history id
``` 

##Brush
``` 
& 10                              ; Size 10
& -4                              ; Eraser, Size 4
& 4 ff0000                        ; Red brush, Size 4
& ?                               ; Size 1, black
``` 

##Pointers
``` 
> 10 0                            ; Add pointer at pos
> 10 0                            ; Remove pointer at pos
> 0 0 400 0                       ; Mirror X, at 400px
> ?                               ; Remove pointers
``` 

##Guides
``` 
| 10 10 100 100                   ; Draw a guide
| -100                            ; Draw a grid at every 100px
| ?                               ; Remove guides
``` 

##Translate*
``` 
+ 0 10                            ; Translate 10px vertically
- 20 20                           ; Translate 20px leftward and downward
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
5w                                ; 5% of canvas width
7h                                ; 7% of canvas height
5s                                ; Brush speed
{5h - 5s}                         ; 5% of canvas width, minus brush speed
``` 
