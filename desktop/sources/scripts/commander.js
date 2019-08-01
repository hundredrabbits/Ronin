function Commander (ronin) {
  this.el = document.createElement('div')
  this.el.id = 'commander'
  this._input = document.createElement('textarea')
  this._status = document.createElement('div')
  this._status.id = 'status'
  this._log = document.createElement('div')
  this._log.id = 'log'
  this._source = document.createElement('div')
  this._source.id = 'source'
  this._docs = document.createElement('div')
  this._docs.id = 'help'
  this.isVisible = true

  this.install = function (host) {
    this.el.appendChild(this._input)
    this._status.appendChild(this._log)
    this._status.appendChild(this._source)
    this._status.appendChild(this._docs)
    this.el.appendChild(this._status)
    host.appendChild(this.el)
    this._input.addEventListener('input', this.onInput)
    this._input.addEventListener('click', this.onClick)

    this._input.onkeydown = (e) => {
      if (e.keyCode == 9 || e.which == 9) { e.preventDefault(); this.inject('  ') }
    }

    this.docs.install()
  }

  this.start = function () {
    this.setStatus('Ready.')
    this.load(this.splash)
    this.show()
  }

  this.run = (txt = this._input.value) => {
    if (this._input.value.indexOf('$') > -1) { txt = this.clean(txt) }
    ronin.bindings = {}
    if (this._input.value.trim() === '') {
      ronin.surface.maximize()
    }
    ronin.interpreter.run(txt)
  }

  this.load = function (txt) {
    this._input.value = txt
    this.run(txt)
  }

  this.clear = function () {
    this.load('')
  }

  this.reindent = function () {
    let val = this._input.value.replace(/\n/g, '').replace(/ +(?= )/g, '').replace(/\( \(/g, '((').replace(/\) \)/g, '))').trim()
    let depth = 0
    if (val.split('(').length !== val.split(')').length) {
      ronin.log('Uneven number of parens.')
      return
    }
    for (let i = 0; i < val.length; i++) {
      const c = val.charAt(i)
      if (c === '(') { depth++ } else if (c === ')') { depth-- }
      if (c === ';') {
        const indent = '\n' + ('  '.repeat(depth))
        val = val.insert(indent, i)
        i += indent.length
      }
      if (c === '(') {
        const indent = '\n' + ('  '.repeat(depth - 1))
        val = val.insert(indent, i)
        i += indent.length
      }
    }
    this._input.value = val.trim()
  }

  this.clean = function (input) {
    const keywords = ['$pos+', '$pos', '$rect', '$line', '$x', '$y', '$xy']
    for (word of keywords) {
      input = input.replace(word, '').trim()
    }
    return input
  }

  this.cleanup = function () {
    this._input.value = this.clean(this._input.value)
    this.reindent()
    this.run()
  }

  this.setStatus = function (msg) {
    // Logs
    if (msg && msg !== this._log.textContent) {
      this._log.textContent = `${msg}`
      // console.log(msg)
    }
    // Source
    const rect = ronin.surface.getFrame()
    const _source = `${ronin.source}[${this._input.value.split('\n').length}]\n${rect.w}x${rect.h}`
    if (_source !== this._source.textContent) {
      this._source.textContent = _source
    }
    // Docs
    const _docs = this.docs.print(this.getLastfn())
    if (_docs !== this._docs.textContent) {
      this._docs.textContent = `${_docs}`
    }
  }

  this.update = function () {

  }

  this.onInput = () => {
    this.setStatus()
  }

  this.onClick = () => {
    this.setStatus()
  }

  this.getLastfn = function () {
    const pos = this._input.value.substr(0, this._input.selectionStart).lastIndexOf('(')
    return this._input.value.substr(pos).split(' ')[0].replace(/\(/g, '').replace(/\)/g, '').trim()
  }

  // Injection

  this.cache = this._input.value

  this.capture = function () {
    if (this._input.value.indexOf('$') < 0) { return }
    this.cache = this._input.value
  }

  this.inject = function (injection, at = this._input.selectionStart) {
    this._input.value = this._input.value.substring(0, this._input.selectionStart) + injection + this._input.value.substring(this._input.selectionEnd)
    this._input.selectionEnd = at + injection.length
  }

  this.injectPath = function (path) {
    if (this._input.value.indexOf('$') < 0) { return }
    this._input.value = this._input.value.replace('$path', `"${path}"`)
  }

  // Helpers

  this.commit = function (shape, end = false, run = false) {
    if (this.cache.indexOf('$') < 0) { return }
    const segs = this.cache.split('$')
    const words = segs[1].split(' ')
    const word = words[0].split(/[^A-Za-z]/)[0]
    const append = words[0].indexOf('+') > -1

    if (word === 'drag') {
      this.cache = this.cache.replace('$drag', `(drag $rect $line)`)
    } else if (word === 'view') {
      this.cache = this.cache.replace('$view', `(view $rect $rect)`)
    } else if (word === 'poly') {
      this.cache = this.cache.replace('$poly', `(poly $pos+)`)
    }

    if (shape[word]) {
      if (append) {
        this._input.value = this.cache.replace('$' + word + '+', this.template(shape[word], word) + ' $' + word + '+')
      } else {
        this._input.value = this.cache.replace('$' + word, this.template(shape[word], word))
      }
    }

    if (end === true) {
      this.cache = this._input.value
    }
    if (run === true) {
      this.run()
    }
  }

  this.template = function (shape, word) {
    if (word === 'rect') { return `(rect ${shape.x} ${shape.y} ${shape.w} ${shape.h})` }
    if (word === 'pos') { return `(pos ${shape.x} ${shape.y})` }
    if (word === 'line') { return `(line ${shape.a.x} ${shape.a.y} ${shape.b.x} ${shape.b.y})` }
    if (word === 'circle') { return `(circle ${shape.cx} ${shape.cy} ${shape.r})` }
    if (word === 'x' || word === 'y' || word === 'xy') { return `${shape}` }
    return ''
  }

  // Display

  this.show = function (expand = false) {
    if (this.isVisible === true) { return }
    ronin.el.className = expand ? 'expand' : ''
    this.isVisible = true
    this._input.focus()
  }

  this.hide = function () {
    if (this.isVisible !== true) { return }
    ronin.el.className = 'hidden'
    this.isVisible = false
    this._input.blur()
  }

  this.toggle = function (expand = false) {
    if (this.isVisible !== true) {
      this.show(expand)
    } else {
      this.hide()
    }
  }

  // Docs micro-module

  this.docs = {
    dict: {},
    load: function () {
      const fs = require('fs')
      const path = require('path')
      const p = path.join(__dirname, 'scripts/', 'library.js')
      if (!fs.existsSync(p)) { console.warn('Docs', 'File does not exist: ' + p); return }
      const lines = fs.readFileSync(p, 'utf8').split('\n').filter((line) => { return line.substr(0, 7) === '  this.' })
      return lines.map((line) => { return line.trim().substr(5).trim() })
    },
    install: function (payload = this.load()) {
      for (const id in payload) {
        const name = payload[id].substr(0, payload[id].indexOf(' = '))
        const parent = payload[id].substr(payload[id].indexOf(' = ')).match(/\(([^)]+)\)/)
        const params = parent ? parent[1].split(',').map((word) => { return word.indexOf(' = ') > -1 ? '~' + (word.split(' = ')[0]).trim() : word.trim() }) : []
        const note = payload[id].indexOf('// ') > -1 ? payload[id].split('//')[1].trim() : ''
        this.dict[name] = { note, params }
        if (params.length < 1) { console.warn('Docs', 'Missing params for ' + name) }
        if (note === '') { console.warn('Docs', 'Missing note for ' + name) }
      }
      console.log('Docs', `Loaded ${Object.keys(this.dict).length} functions.`)
      console.log(this.toMarkdown())
    },
    toMarkdown: function () {
      return Object.keys(this.dict).reduce((acc, item, key) => {
        const example = `${item} ${this.dict[item].params.reduce((acc, item) => {
          return `${acc}${item} `
        }, '').trim()}`
        return `${acc}- \`(${example.trim()})\` ${this.dict[item].note}\n`
      }, '')
    },
    print: function (name) {
      return this.dict[name] ? `(${name} ${this.dict[name].params.reduce((acc, item) => { return `${acc}${item} ` }, '').trim()})` : 'idle.'
    }
  }

  // Splash

  this.splash = `; welcome to ronin - v2.24
(clear) 
(def frame-rect 
  (frame))
(def align { 
  :x (sub (div frame-rect:c 2) 150) 
  :y (sub frame-rect:m 150)})
(fill 
  (svg align:x align:y "M15,15 L15,15 L285,15 L285,285 L15,285 Z") "#fff")
(stroke 
  (svg align:x align:y "M60,60 L195,60 A45,45 0 0,1 240,105 A45,45 0 0,1 195,150 L60,150 M195,150 A45,45 0 0,1 240,195 L240,240 ") "#000" 5)`

  String.prototype.insert = function (s, i) { return [this.slice(0, i), `${s}`, this.slice(i)].join('') }
}
