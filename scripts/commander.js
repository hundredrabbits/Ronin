'use strict'

function Commander (client) {
  this.el = document.createElement('div')
  this.el.id = 'commander'
  this._input = document.createElement('textarea')
  this._status = document.createElement('div'); this._status.id = 'status'
  this._log = document.createElement('div'); this._log.id = 'log'
  this._docs = document.createElement('div'); this._docs.id = 'help'
  this._run = document.createElement('a'); this._run.id = 'run'

  this.isVisible = true

  this.install = function (host) {
    this.el.appendChild(this._input)
    this._status.appendChild(this._log)
    this._status.appendChild(this._docs)
    this._status.appendChild(this._run)
    this.el.appendChild(this._status)
    host.appendChild(this.el)
    this._run.setAttribute('title', 'Run(c-R)')
    this._input.setAttribute('autocomplete', 'off')
    this._input.setAttribute('autocorrect', 'off')
    this._input.setAttribute('autocapitalize', 'off')
    this._input.setAttribute('spellcheck', 'false')
    this._input.addEventListener('input', this.onInput)
    this._input.addEventListener('click', this.onClick)
    this._run.addEventListener('click', () => { this.run() })

    this._input.onkeydown = (e) => {
      if (e.keyCode === 9 || e.which === 9) { e.preventDefault(); this.inject('  ') }
    }
    client.surface.maximize()
  }

  this.start = function () {
    this.show()
    this._input.value = this.splash
    setTimeout(() => { this.run() }, 1000)
    this.setStatus('Ready.')
  }

  this.run = (txt = this._input.value) => {
    if (this._input.value.indexOf('$') > -1) { txt = this.clean(txt) }
    client.bindings = {}
    if (this._input.value.trim() === '') {

    }
    client.lain.run(`(${txt})`)
    this.feedback()
  }

  this.load = function (txt) {
    this._input.value = txt
    this.run(txt)
  }

  this.clear = function () {
    this.load('')
  }

  this.cleanup = function () {
    this._input.value = this.clean(this._input.value)
    this.reindent()
    this.run()
  }

  this.update = function () {

  }

  this.onInput = () => {
    this.setStatus()
  }

  this.onClick = () => {
    this.setStatus()
  }

  this.reindent = function () {
    let val = this._input.value.replace(/\n/g, '').replace(/ \)/g, ')').replace(/ +(?= )/g, '').replace(/\( \(/g, '((').replace(/\) \)/g, '))').trim()
    let depth = 0
    if (val.split('(').length !== val.split(')').length) {
      client.log('Uneven number of parens.')
      return
    }
    for (let i = 0; i < val.length; i++) {
      const c = val.charAt(i)
      if (c === '(') { depth++ } else if (c === ')') { depth-- }
      if (c === ';') {
        const indent = '\n' + ('  '.repeat(depth))
        val = insert(val, indent, i)
        i += indent.length
      }
      if (c === '(') {
        const indent = '\n' + ('  '.repeat(depth - 1))
        val = insert(val, indent, i)
        i += indent.length
      }
    }
    // Space out comments
    val = val.split('\n').map((line) => { return line.substr(0, 2) === '; ' ? `\n${line}\n` : line }).join('\n')

    this._input.value = val.trim()
  }

  this.clean = function (input) {
    const keywords = ['$pos+', '$pos', '$rect', '$line', '$x', '$y', '$xy']
    for (const word of keywords) {
      input = input.replace(word, '').trim()
    }
    return input
  }

  this.setStatus = function (msg) {
    // Logs
    if (msg && msg !== this._log.textContent) {
      this._log.textContent = `${msg}`
    }
    this._docs.textContent = this.getDocs()
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
      this.cache = this.cache.replace('$drag', '(drag $rect $line)')
    } else if (word === 'view') {
      this.cache = this.cache.replace('$view', '(view $rect $rect)')
    } else if (word === 'poly') {
      this.cache = this.cache.replace('$poly', '(poly $pos+)')
    } else if (word === 'move') {
      this.cache = this.cache.replace('$move', '(transform:move $wh)')
    } else if (word === 'rotate') {
      this.cache = this.cache.replace('$rotate', '(transform:rotate $a)')
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
    if (word === 'arc') { return `(arc ${shape.cx} ${shape.cy} ${shape.r} ${shape.sa} ${shape.ea})` }
    if (word === 'x' || word === 'y' || word === 'xy' || word === 'wh' || word === 'a' || word === 'r') { return `${shape}` }
    return ''
  }

  // Display

  this.show = function (expand = false) {
    if (this.isVisible === true) { return }
    client.el.className = expand ? 'expand' : ''
    this.isVisible = true
    this._input.focus()
  }

  this.hide = function () {
    if (this.isVisible !== true) { return }
    client.el.className = 'hidden'
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

  this.length = function () {
    return this._input.value.split('\n').length
  }

  this.feedback = function () {
    this._run.className = 'active'
    setTimeout(() => { this._run.className = '' }, 150)
  }

  // Docs

  this.getCurrentWord = () => {
    const pos = this._input.value.substr(0, this._input.selectionStart).lastIndexOf('(')
    return this._input.value.substr(pos).split(' ')[0].replace(/\(/g, '').replace(/\)/g, '').trim()
  }

  this.getCurrentFunction = () => {
    const word = this.getCurrentWord()
    let mostSimilar = ''
    if (client.library[word]) { return word }
    for (const id of Object.keys(client.library)) {
      if (id.substr(0, word.length) === word) {
        mostSimilar = id
      }
    }
    return mostSimilar
  }

  this.getDocs = (id) => {
    const name = this.getCurrentFunction()
    const fn = client.library[name]
    if (!fn) { return }
    const fnString = fn.toString()
    if (fnString.indexOf(') => {') < 0) { return }
    const fnParams = fnString.split(') => {')[0].substr(1).split(',').reduce((acc, item) => { return `${acc}${item.indexOf('=') > -1 ? '~' + item.split('=')[0].trim() : item} ` }, '').trim()
    return `(${(name + ' ' + fnParams).trim()})`
  }

  // Splash

  this.splash = `; Ronin v2.50

(def logo-path "M60,60 L195,60 A45,45 0 0,1 240,105 A45,45 0 0,1 195,150 L60,150 M195,150 A45,45 0 0,1 240,195 L240,240 ")
;
(clear) 
(resize 600 600)
(stroke 
  (svg 140 140 logo-path) "black" 7)`

  function insert (str, add, i) {
    return [str.slice(0, i), `${add}`, str.slice(i)].join('')
  }
}
