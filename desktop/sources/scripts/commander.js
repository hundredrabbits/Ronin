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
    this.docs.install()
  }

  this.start = function () {
    this.setStatus('Ready.')
    this.load(this.splash)
    this.show()
  }

  this.run = (txt = this._input.value) => {
    ronin.bindings = {}
    ronin.surface.maximize()
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

  this.setStatus = function (msg) {
    // Logs
    if (msg && msg !== this._log.textContent) {
      this._log.textContent = `${msg}`
      // console.log(msg)
    }
    // Source
    const _source = `${ronin.source} ${this._input.value.split('\n').length} lines`
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

  this.cache = ''

  this.capture = function () {
    this.cache = this._input.value
  }

  this.canInject = function () {
    return this._input.value.indexOf('$path') > -1
  }

  this.injectPath = function (path) {
    if (this.canInject()) {
      this._input.value = this._input.value.replace('$path', `"${path}"`)
    }
  }

  this.commit = function () {
    let value = this.cache

    if (value.indexOf('$') < 0) {
      return
    }

    ronin.surface.clearGuide()

    const next = value.split('$')[1]

    if (next.substr(0, 4) === 'pos)') {
      value = value.replace('($pos)', `(pos ${this.mouseRect.x} ${this.mouseRect.y})`)
      this.mouseRect.t = 'pos'
      ronin.surface.stroke(this.mouseRect, 2, 'white', ronin.surface.guide)
    }

    if (next.substr(0, 5) === 'rect)') {
      value = value.replace('($rect)', `(rect ${this.mouseRect.x} ${this.mouseRect.y} ${this.mouseRect.w} ${this.mouseRect.h})`)
      this.mouseRect.t = 'rect'
      ronin.surface.stroke(this.mouseRect, 2, 'white', ronin.surface.guide)
    }

    if (next.substr(0, 5) === 'line)') {
      value = value.replace('($line)', `(line (pos ${this.mouseRect.a.x} ${this.mouseRect.a.y}) (pos ${this.mouseRect.b.x} ${this.mouseRect.b.y}))`)
      this.mouseRect.t = 'line'
      ronin.surface.stroke(this.mouseRect, 2, 'white', ronin.surface.guide)
    }

    this._input.value = value
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
      return this.dict[name] ? `(${name} ${this.dict[name].params.reduce((acc, item) => { return `${acc}${item} ` }, '').trim()})` : ''
    }
  }

  // Splash

  this.splash = `; welcome to ronin - v2.1
(clear) 
; ronin path 
(def align {
    :x (sub (of (frame) :center) 500) 
    :y (sub (of (frame) :middle) 150)})
; outline 
(fill 
  (svg 
    (of align :x) 
    (of align :y) "M15,15 L15,15 L285,15 L285,285 L15,285 Z") "#fff")
; stroke
(stroke 
  (svg 
    (of align :x) 
    (of align :y) "M60,60 L195,60 A45,45 0 0,1 240,105 A45,45 0 0,1 195,150 L60,150 M195,150 A45,45 0 0,1 240,195 L240,240 ") 5 "#000")`

  String.prototype.insert = function (s, i) { return [this.slice(0, i), `${s}`, this.slice(i)].join('') }
}
