'use strict'

function Acels (client) {
  this.el = document.createElement('ul')
  this.el.id = 'acels'

  this.order = []
  this.all = {}
  this.roles = {}
  this.pipe = null

  this.install = (host = document.body) => {
    window.addEventListener('keydown', this.onKeyDown, false)
    window.addEventListener('keyup', this.onKeyUp, false)
    host.appendChild(this.el)
  }

  this.start = () => {
    const cats = this.sort()
    for (const cat of this.order) {
      const main = document.createElement('li')
      const head = document.createElement('a')
      head.innerText = cat
      const subs = document.createElement('ul')
      for (const item of cats[cat]) {
        const option = document.createElement('li')
        option.onclick = item.downfn
        option.innerHTML = item.accelerator ? `${item.name} <i>${item.accelerator.replace('CmdOrCtrl+', '^')}</i>` : `${item.name}`
        subs.appendChild(option)
      }
      main.appendChild(head)
      main.appendChild(subs)
      this.el.appendChild(main)
    }
  }

  this.set = (cat, name, accelerator, downfn, upfn) => {
    if (this.all[accelerator]) { console.warn('Acels', `Trying to overwrite ${this.all[accelerator].name}, with ${name}.`) }
    if (this.order.indexOf(cat) < 0) { this.order.push(cat) }
    this.all[accelerator] = { cat, name, downfn, upfn, accelerator }
  }

  this.add = (cat, role) => {
    this.all[':' + role] = { cat, name: role, role }
  }

  this.get = (accelerator) => {
    return this.all[accelerator]
  }

  this.sort = () => {
    const h = {}
    for (const item of Object.values(this.all)) {
      if (!h[item.cat]) { h[item.cat] = [] }
      h[item.cat].push(item)
    }
    return h
  }

  this.convert = (event) => {
    const accelerator = event.key === ' ' ? 'Space' : capitalize(event.key.replace('Arrow', ''))
    if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
      return `CmdOrCtrl+Shift+${accelerator}`
    }
    if (event.shiftKey && event.key.toUpperCase() !== event.key) {
      return `Shift+${accelerator}`
    }
    if (event.altKey && event.key.length !== 1) {
      return `Alt+${accelerator}`
    }
    if (event.ctrlKey || event.metaKey) {
      return `CmdOrCtrl+${accelerator}`
    }
    return accelerator
  }

  this.route = (obj) => {
    this.pipe = obj
  }

  this.onKeyDown = (e) => {
    const target = this.get(this.convert(e))
    if (!target || !target.downfn) { return this.pipe ? this.pipe.onKeyDown(e) : null }

    target.downfn()
    e.preventDefault()
  }

  this.onKeyUp = (e) => {
    const target = this.get(this.convert(e))
    if (!target || !target.upfn) { return this.pipe ? this.pipe.onKeyUp(e) : null }
    target.upfn()
    e.preventDefault()
  }

  this.toMarkdown = () => {
    const cats = this.sort()
    let text = ''
    for (const cat in cats) {
      text += `\n### ${cat}\n\n`
      for (const item of cats[cat]) {
        text += item.accelerator ? `- \`${item.accelerator}\`: ${item.name}\n` : ''
      }
    }
    return text.trim()
  }

  this.toString = () => {
    const cats = this.sort()
    let text = ''
    for (const cat of this.order) {
      for (const item of cats[cat]) {
        text += item.accelerator ? `${cat.padEnd(8, ' ')} ${item.name.padEnd(16, ' ')} ${item.accelerator.replace('CmdOrCtrl+', '^')}\n` : ''
      }
    }
    return text.trim()
  }

  this.toggle = () => {
    this.el.className = this.el.className === 'hidden' ? '' : 'hidden'
  }

  function capitalize (s) { return s.substr(0, 1).toUpperCase() + s.substr(1) }
}
