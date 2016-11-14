#Ronin

##Canvas
```  
@ 100 100                         ; New canvas of size
@ ?                               ; Clear canvas
```

##Background
``` 
* ff0000                          ; Fill background with red color
* ?                               ; Remove background
``` 

##Save File
``` 
$ new_name.jpg                    ; Create a new file with name
``` 

##Load File
``` 
/ dir/file_name.jpg 10 10 100 100 ; Load image, at 10,10 with size 100x100
/ dir/file_name.jpg 10 10 100     ; Load image, at 10,10 with size 100w and auto height
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

#Upcoming Features

##Zoom
``` 
= 75                              ; Zoom factor
= ?                               ; Zoom 100%
``` 

##Layers
``` 
# 3                               ; Layer 3
# ?                               ; Layer 1
``` 