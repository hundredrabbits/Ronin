'use strict'

function Acels (client) {
  this.all = {}
  this.roles = {}
  this.pipe = null

  this.install = (host = window) => {
    host.addEventListener('keydown', this.onKeyDown, false)
    host.addEventListener('keyup', this.onKeyUp, false)
  }

  this.set = (cat, name, accelerator, downfn, upfn) => {
    if (this.all[accelerator]) { console.warn('Acels', `Trying to overwrite ${this.all[accelerator].name}, with ${name}.`) }
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
    const accelerator = event.key === ' ' ? 'Space' : event.key.substr(0, 1).toUpperCase() + event.key.substr(1)
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

  this.pipe = (obj) => {
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
    for (const cat in cats) {
      for (const item of cats[cat]) {
        text += item.accelerator ? `${cat}: ${item.name} | ${item.accelerator}\n` : ''
      }
    }
    return text.trim()
  }
}
