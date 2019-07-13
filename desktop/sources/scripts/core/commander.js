function Commander () {
  this.el = document.createElement('yu')
  this.el.id = 'commander'
  this.input_el = document.createElement('textarea')
  this.input_el.value = `
(scale 0.5 0.5 
  (resize 150 150 
    (crop 
      (rect 0 0 300 300))))`.trim()

  this.install = function () {
    this.el.appendChild(this.input_el)
    ronin.el.appendChild(this.el)
    this.input_el.focus()
  }

  this.update = function () {

  }

  this.getQuery = function () {

  }
}
