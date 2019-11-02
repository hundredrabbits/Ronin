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

  this.open = (callback) => {
    console.log('Source', 'Open file..')
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e) => {
      this.cache = e.target.files[0]
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
    const pom = document.createElement('a')
    pom.setAttribute('download', name)
    pom.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content))
    pom.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
  }
}
