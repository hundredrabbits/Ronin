'use strict'

function Source (ronin) {
  const fs = require('fs')
  const path = require('path')
  const { dialog, app } = require('electron').remote

  this.path = null

  this.start = function () {
    this.new()
  }

  this.new = function () {
    console.log('Source', 'Make a new file..')
    this.path = null
  }

  this.open = function () {
    console.log('Source', 'Open a file..')
    let paths = dialog.showOpenDialog(app.win, { properties: ['openFile'], filters: [{ name: 'Ronin Lisp', extensions: ['lisp'] }] })
    if (!paths) { console.log('Nothing to load'); return }
    this.read(paths[0])
  }

  this.save = function (quitAfter = false) {
    console.log('Source', 'Save..', this.path)
    if (this.path) {
      this.write(this.path, this.generate(), quitAfter)
    } else {
      this.saveAs(quitAfter)
    }
  }

  this.saveAs = function (quitAfter = false) {
    console.log('Source', 'Save a file as..')
    dialog.showSaveDialog((loc) => {
      if (loc === undefined) { return }
      if (loc.indexOf('.lisp') < 0) { loc += '.lisp' }
      this.write(loc, this.generate(), quitAfter)
      this.path = loc
    })
  }

  this.revert = function () {
    if (!this.path) { return }
    console.log('Source', 'Revert a file..')
    this.read(this.path)
  }

  // I/O

  this.write = function (loc, data = this.generate(), quitAfter = false) {
    console.log('Source', 'Writing ' + loc)
    fs.writeFileSync(loc, data)
    if (quitAfter === true) {
      app.exit()
    }
  }

  this.read = function (loc = this.path) {
    if (!loc) { return }
    if (!fs.existsSync(loc)) { console.warn('Source', 'File does not exist: ' + loc); return }
    console.log('Source', 'Reading ' + loc)
    this.path = loc
    this.load(fs.readFileSync(this.path, 'utf8'))
  }

  this.run = function () {
    ronin.commander.run()
  }

  this.load = function (data) {
    ronin.commander._input.value = data
  }

  this.quit = function () {
    if (this.hasChanges() === true) {
      this.verify()
    } else {
      app.exit()
    }
  }

  this.verify = function () {
    let response = dialog.showMessageBox(app.win, {
      type: 'question',
      buttons: ['Cancel', 'Discard', 'Save'],
      title: 'Confirm',
      message: 'Unsaved data will be lost. Would you like to save your changes before leaving?',
      icon: path.join(__dirname, '../icon.png')
    })
    if (response === 2) {
      this.save(true)
    } else if (response === 1) {
      app.exit()
    }
  }

  this.hasChanges = function () {
    console.log('Source', 'Looking for changes..')
    if (!this.path) {
      console.log('Source', 'File is unsaved..')
      if (ronin.commander._input.value.length() > 2) {
        console.log('Source', `File is not empty.`)
        return true
      }
    } else {
      if (fs.existsSync(this.path)) {
        console.log('Source', 'Comparing with last saved copy..')
        const diff = isDifferent(fs.readFileSync(this.path, 'utf8'), this.generate())
        if (diff === true) {
          console.log('Source', 'File has been changed.')
          return true
        }
      } else {
        console.log('Source', 'File does not exist.')
        return true
      }
    }
  }

  // Converters

  this.generate = function (str = ronin.commander._input.value) {
    return `${str}`
  }

  this.locate = function (name) {
    if (!this.path) { return }
    const loc = path.join(this.folder(), name)
    return fs.existsSync(loc) ? loc : null
  }

  // Etc

  this.name = function () {
    return this.path ? path.basename(this.path, '.lisp') : null
  }

  this.folder = function () {
    return this.path ? path.dirname(this.path) : null
  }

  this.toString = function () {
    return this.path ? this.name() : 'unsaved'
  }

  function isDifferent (a, b) {
    return a.trim() !== b.trim()
  }

  function clean (s) {
    return s
  }
}
