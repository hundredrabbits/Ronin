function Module (name, docs = 'Missing documentation.') {
  this.name = name
  this.methods = {}

  this.docs = docs

  this.hint = function () {
    var html = ''

    for (id in this.methods) {
      var v = this.methods[id]
      html += v.hint()
    }

    return html.trim() != '' ? ' ' + html.trim() : ''
  }
}
