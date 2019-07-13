function Method (name, params, info = 'Missing documentation', f) {
  this.name = name
  this.params = params
  this.info = info
  this.run = f

  this.docs = function () {
    return '<b>' + this.params + '</b> <i>' + this.info + '</i>'
  }
}
