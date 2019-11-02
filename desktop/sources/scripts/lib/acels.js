'use strict'

function Acels () {
  this.all = {}

  this.install = (host = window) => {
    host.addEventListener('keydown', this.onKeyDown, false)
    host.addEventListener('keyup', this.onKeyUp, false)
  }

  this.set = (type, name, key, downfn, upfn) => {
    if (this.all[key]) { console.warn('Acels', `Trying to overwrite ${this.all[key].name}, with ${name}.`) }
    this.all[key] = { type, name, downfn, upfn, key }
  }

  this.get = (key) => {
    return this.all[key]
  }

  this.sort = () => {
    const h = {}
    for (const item of Object.values(this.all)) {
      if (!h[item.type]) { h[item.type] = [] }
      h[item.type].push(item)
    }
    return h
  }

  this.convert = (event) => {
    const key = event.key.substr(0, 1).toUpperCase() + event.key.substr(1)
    if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
      return `CmdOrCtrl+Shift+${key}`
    }
    if (event.shiftKey) {
      return `Shift+${key}`
    }
    if (event.ctrlKey || event.metaKey) {
      return `CmdOrCtrl+${key}`
    }
    return key
  }

  this.onKeyDown = (e) => {
    const target = this.get(this.convert(e))
    if (!target || !target.downfn) { return }
    target.downfn()
    e.preventDefault()
  }

  this.onKeyUp = (e) => {
    const target = this.get(this.convert(e))
    if (!target || !target.upfn) { return }
    target.upfn()
    e.preventDefault()
  }

  this.toMarkdown = () => {
    const types = this.sort()
    let text = ''
    for (const type in types) {
      text += `\n### ${type}\n\n`
      for (const item of types[type]) {
        text += `- \`${item.key}\`: ${item.info}\n`
      }
    }
    return text.trim()
  }

  this.toString = () => {
    const types = this.sort()
    let text = ''
    for (const type in types) {
      for (const item of types[type]) {
        text += `${type}: ${item.name} | ${item.key}\n`
      }
    }
    return text.trim()
  }
}
