function Docs (ronin) {
  this.dict = {}

  this.load = () => {
    const fs = require('fs')
    const path = require('path')
    const p = path.join(__dirname, 'scripts/', 'library.js')
    if (!fs.existsSync(p)) { console.warn('Docs', 'File does not exist: ' + p); return }
    const lines = fs.readFileSync(p, 'utf8').split('\n').filter((line) => { return line.substr(0, 7) === '  this.' })
    return lines.map((line) => { return line.trim().substr(5).trim() })
  }

  this.install = (payload = this.load()) => {
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
  }

  this.toMarkdown = () => {
    return Object.keys(this.dict).reduce((acc, item, key) => {
      const example = `${item} ${this.dict[item].params.reduce((acc, item) => {
        return `${acc}${item} `
      }, '').trim()}`
      return `${acc}- \`(${example.trim()})\` ${this.dict[item].note}\n`
    }, '')
  }

  this.hasDocs = (name) => {
    return !!this.dict[name]
  }

  this.print = (name) => {
    return `(${name} ${this.dict[name].params.reduce((acc, item) => { return `${acc}${item} ` }, '').trim()})`
  }
}
