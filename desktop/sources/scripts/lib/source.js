'use strict'

/* global FileReader */
/* global MouseEvent */

function Source () {
  this.cache = {}

  this.install = () => {
  }

  this.start = () => {
    this.new()
  }

  this.new = () => {
    console.log('Source', 'New file..')
    this.cache = {}
  }

  this.open = (ext, callback) => {
    console.log('Source', 'Open file..')
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file.name.indexOf(ext) < 0) { console.warn('Source', 'File is not ' + ext); return }
      this.cache = file
      this.load(this.cache, callback)
    }
    input.click()
  }

  this.save = (name, content, type = 'text/plain', callback) => {
    this.saveAs(name, content, type, callback)
  }

  this.saveAs = (name, content, type = 'text/plain', callback) => {
    console.log('Source', 'Save new file..')
    this.download(name, content, type, callback)
  }

  this.revert = () => {

  }

  // I/O

  this.load = (file, callback) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const res = event.target.result
      callback(res)
    }
    reader.readAsText(file, 'UTF-8')
  }

  this.download = (name, content, type) => {
    console.info('Source', `Downloading ${name}(${type})`)
    const link = document.createElement('a')
    link.setAttribute('download', name)
    if (type === 'image/png' || type === 'image/jpeg') {
      link.setAttribute('href', content)
    } else {
      link.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content))
    }
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
  }
}
