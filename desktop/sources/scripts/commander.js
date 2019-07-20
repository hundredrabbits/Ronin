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
    this._input.focus()
    this.run()
    this.hide()
  }

  this.run = (txt = this._input.value) => {
    if (txt.indexOf('$') > -1) { ronin.log('Present: $'); return }
    ronin.interpreter.run(txt)
    ronin.always === true && requestAnimationFrame(() => this.run(txt))
  }

  this.load = function (txt) {
    ronin.animate(false)
    this._input.value = txt
    this.run(txt)
  }

  this.reindent = function () {
    let val = this._input.value.replace(/\n/g, '').replace(/ +(?= )/g, '').replace(/\( \(/g, '((').replace(/\) \)/g, '))').trim()
    let depth = 0
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
      console.log(msg)
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

  // Mouse

  this.mouseRect = { x: 0, y: 0, w: 0, h: 0, a: { x: 0, y: 0 }, b: { x: 0, y: 0 } }
  this.mouseDown = false

  this.onMouseDown = (e) => {
    this.mouseDown = true
    const offset = this.makeMouseOffset({ x: e.offsetX, y: e.offsetY })
    this.mouseRect.x = offset.x
    this.mouseRect.y = offset.y
    this.mouseRect.a.x = offset.x
    this.mouseRect.a.y = offset.y
    this.mouseRect.t = 'pos'
    this.capture()
    this.show()
  }

  this.onMouseMove = (e) => {
    if (this.mouseDown !== true) { return }
    const offset = this.makeMouseOffset({ x: e.offsetX, y: e.offsetY })
    this.mouseRect.w = offset.x - this.mouseRect.x
    this.mouseRect.h = offset.y - this.mouseRect.y
    this.mouseRect.b.x = offset.x
    this.mouseRect.b.y = offset.y
    this.commit()
  }

  this.onMouseUp = (e) => {
    this.mouseDown = false
    const offset = this.makeMouseOffset({ x: e.offsetX, y: e.offsetY })
    this.mouseRect.w = offset.x - this.mouseRect.x
    this.mouseRect.h = offset.y - this.mouseRect.y
    this.mouseRect.b.x = offset.x
    this.mouseRect.b.y = offset.y
    this.mouseRect.t = ''
    this.commit()
    this._input.focus()
    ronin.surface.clearGuide()
  }

  this.makeMouseOffset = (pos) => {
    return { x: pos.x * ronin.surface.ratio, y: pos.y * ronin.surface.ratio }
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
  }

  this.hide = function () {
    if (this.isVisible !== true) { return }
    ronin.el.className = 'hidden'
    this.isVisible = false
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

  String.prototype.insert = function (s, i) { return [this.slice(0, i), `${s}`, this.slice(i)].join('') }
}
