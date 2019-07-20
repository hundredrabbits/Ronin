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
      if (!input[1].value || !fs.existsSync(input[1].value)) { console.warn('Source', input[1].value); return [] }
      const file = fs.readFileSync(input[1].value, { encoding: 'utf-8' })
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
      const value = input[2].type === TYPES.string && input[3] ? input[3] : input[2]
      context.scope[identifier] = interpret(value, context)
      return value
    },
    defn: function (input, context) {
      const fnName = input[1].value
      const fnParams = input[2].type === TYPES.string && input[3] ? input[3] : input[2]
      const fnBody = input[2].type === TYPES.string && input[4] ? input[4] : input[3]
      context.scope[fnName] = async function () {
        const lambdaArguments = arguments
        const lambdaScope = fnParams.reduce(function (acc, x, i) {
          acc[x.value] = lambdaArguments[i]
          return acc
        }, {})
        return interpret(fnBody, new Context(lambdaScope, context))
      }
    },
    lambda: function (input, context) {
      return async function () {
        const lambdaArguments = arguments
        const lambdaScope = input[1].reduce(function (acc, x, i) {
          acc[x.value] = lambdaArguments[i]
          return acc
        }, {})
        return interpret(input[2], new Context(lambdaScope, context))
      }
    },
    fn: function (input, context) {
      return async function () {
        const lambdaArguments = arguments
        const lambdaScope = [].reduce(function (acc, x, i) {
          acc[x.value] = lambdaArguments[i]
          return acc
        }, {})
        return interpret(input.slice(1), new Context(lambdaScope, context))
      }
    },
    if: async function (input, context) {
      if (await interpret(input[1], context)) {
        return interpret(input[2], context)
      }
      return input[3] ? interpret(input[3], context) : []
    }
  }

  const interpretList = async function (input, context) {
    if (input.length > 0 && input[0].value in special) {
      return special[input[0].value](input, context)
    }
    const list = []
    for (let i = 0; i < input.length; i++) {
      list.push(await interpret(input[i], context))
    }
    return list[0] instanceof Function ? list[0].apply(undefined, list.slice(1)) : list
  }

  const interpret = async function (input, context) {
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
    } else if (token === '\'(') {
      input.unshift('fn')
      list.push(parenthesize(input, []))
      return parenthesize(input, list)
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
    const i = input.replace(/^\;.*\n?/gm, '').split('"')
    return i.map(function (x, i) { 
      return i % 2 === 0 ? 
        x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').replace(/' \( /g, ' \'( ')
        : x.replace(/ /g, '!whitespace!') 
    })
    .join('"').trim().split(/\s+/)
    .map(function (x) { return x.replace(/!whitespace!/g, ' ') })
  }

  this.parse = function (input) {
    return parenthesize(tokenize(`(${input})`))
  }

  this.toPixels = async function () {
    return interpret(this.parse(input))
  }
}
