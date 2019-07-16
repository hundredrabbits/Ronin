'use strict'

function Lisp (input, lib) {
  const path = require('path')
  const fs = require('fs')

  const TYPES = { identifier: 0, number: 1, string: 2, bool: 3 }
  const Context = function (scope, parent) {
    this.scope = scope
    this.parent = parent

    this.get = function (identifier) {
      if (identifier in this.scope) {
        return this.scope[identifier]
      } else if (this.parent !== undefined) {
        return this.parent.get(identifier)
      }
    }
  }

  const special = {
    include: (input, context) => {
      const p = input[1].value
      if (!fs.existsSync(p)) { console.warn('Source', p); return [] }
      const file = fs.readFileSync(p, { encoding: 'utf-8' })
      return interpret(this.parse(file), context)
    },
    let: function (input, context) {
      const letContext = input[1].reduce(function (acc, x) {
        acc.scope[x[0].value] = interpret(x[1], context)
        return acc
      }, new Context({}, context))
      return interpret(input[2], letContext)
    },
    def: function (input, context) {
      const identifier = input[1].value
      const value = (input[2].type === TYPES.string) ? input[3] : input[2]
      if (input[2].type === TYPES.string) {
        // docstring
        console.log(input[2].value)
      }
      context.scope[identifier] = interpret(value, context)
      return value
    },
    defn: function (input, context) {
      const identifier = input[1].value
      const argumentNames = (input[2].type === TYPES.string) ? input[3] : input[2]
      const functionBody = (input[2].type === TYPES.string) ? input[4] : input[3]
      if (input[2].type === TYPES.string) {
        // docstring
        console.log(input[2].value)
      }
      context.scope[identifier] = function () {
        const lambdaArguments = arguments
        const lambdaScope = argumentNames.reduce(function (acc, x, i) {
          acc[x.value] = lambdaArguments[i]
          return acc
        }, {})
        return interpret(functionBody, new Context(lambdaScope, context))
      }
    },
    lambda: function (input, context) {
      return function () {
        const lambdaArguments = arguments
        const lambdaScope = input[1].reduce(function (acc, x, i) {
          acc[x.value] = lambdaArguments[i]
          return acc
        }, {})
        return interpret(input[2], new Context(lambdaScope, context))
      }
    },
    if: function (input, context) {
      if (interpret(input[1], context)) {
        return interpret(input[2], context)
      }
      return input[3] ? interpret(input[3], context) : []
    }
  }

  const interpretList = function (input, context) {
    if (input.length > 0 && input[0].value in special) {
      return special[input[0].value](input, context)
    }
    const list = input.map(function (x) { return interpret(x, context) })
    return list[0] instanceof Function ? list[0].apply(undefined, list.slice(1)) : list
  }

  const interpret = function (input, context) {
    if (!input) { console.warn('error', context.scope); return null }

    if (context === undefined) {
      return interpret(input, new Context(lib))
    } else if (input instanceof Array) {
      return interpretList(input, context)
    } else if (input.type === TYPES.identifier) {
      return context.get(input.value)
    } else if (input.type === TYPES.number || input.type === TYPES.string || input.type === TYPES.bool) {
      return input.value
    }
  }

  const categorize = function (input) {
    if (!isNaN(parseFloat(input))) {
      return { type: TYPES.number, value: parseFloat(input) }
    } else if (input[0] === '"' && input.slice(-1) === '"') {
      return { type: TYPES.string, value: input.slice(1, -1) }
    } else if (input === 'true' || input === 'false') {
      return { type: TYPES.bool, value: input === 'true' }
    } else {
      return { type: TYPES.identifier, value: input }
    }
  }

  const parenthesize = function (input, list) {
    if (list === undefined) { return parenthesize(input, []) }
    const token = input.shift()
    if (token === undefined) {
      return list.pop()
    } else if (token === '(') {
      list.push(parenthesize(input, []))
      return parenthesize(input, list)
    } else if (token === ')') {
      return list
    } else {
      return parenthesize(input, list.concat(categorize(token)))
    }
  }

  const tokenize = function (input) {
    return input.replace(/^\;.*\n?/gm, '').split('"').map(function (x, i) { return i % 2 === 0 ? x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ') : x.replace(/ /g, '!whitespace!') }).join('"').trim().split(/\s+/).map(function (x) { return x.replace(/!whitespace!/g, ' ') })
  }

  this.parse = function (input) {
    return parenthesize(tokenize(input))
  }

  this.toPixels = function () {
    return interpret(this.parse(input))
  }
}
