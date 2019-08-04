# Prelude

## Colors

### Compare two Colors

Use: `(if (color-eq (255 200 0) (200 255 0)) "yes" "no")`.

```
(defn color-eq 
  (a b) 
  (and 
    (eq a:0 b:0) 
    (eq a:1 b:1) 
    (eq a:2 b:2)))
```

## Pixels

### Erase all pixels of a specific color

Use: `(pixels erase-color (255 0 0))`.

```
(defn erase-color 
  (a b) 
  (a:0 a:1 a:2 
    (if 
      (and 
        (eq a:0 b:0) 
        (eq a:1 b:1) 
        (eq a:2 b:2)) 0 255)))
```

### Posterize

Use: `(pixels posterize 40)`.

```
(defn posterize 
  (a q) 
  (
    (step a:0 q) 
    (step a:1 q) 
    (step a:2 q) a:3))
```