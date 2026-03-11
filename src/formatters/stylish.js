import _ from 'lodash'

const isObject = value => value && typeof value === 'object' && !Array.isArray(value)

const formatObject = (obj, depth) => {
  const keys = _.sortBy(_.keys(obj))
  const nodes = keys.map(key => ({ key, type: 'unchanged', value: obj[key] }))
  return stylish (nodes, depth)
}

const stringifyValue = (value, depth) => {
  if (value === null) return 'null'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (isObject(value)) {
    return formatObject(value, depth + 1)
  }
  return String (value)
}

const makeIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2)

const stylish = (diff, depth = 1) => {
  const indent = makeIndent(depth)
  const bracketIndent = ' '.repeat((depth - 1) * 4)

  const lines = diff.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringifyValue(node.value, depth)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringifyValue(node.value, depth)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringifyValue(node.value, depth)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringifyValue(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringifyValue(node.newValue, depth)}`,
        ]
      case 'nested':
        return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })
  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default stylish
