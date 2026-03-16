// Вспомогательная функция для форматирования значения
const stringifyForPlain = (value) => {
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  if (typeof value === 'object') {
    // объекты, массивы, null уже обработаны выше, но для полноты:
    return '[complex value]'
  }
  return String(value)
}

// Основная функция форматера
const plain = (diff, parentPath = '') => {
  const lines = diff.flatMap((node) => {
    const fullPath = parentPath ? `${parentPath}.${node.key}` : node.key

    switch (node.type) {
      case 'nested':
        // рекурсивно обрабатываем детей
        return plain(node.children, fullPath)

      case 'added':
        return `Property '${fullPath}' was added with value: ${stringifyForPlain(node.value)}`

      case 'removed':
        return `Property '${fullPath}' was removed`

      case 'changed':
        return `Property '${fullPath}' was updated. From ${stringifyForPlain(node.oldValue)} to ${stringifyForPlain(node.newValue)}`

      case 'unchanged':
        // ничего не возвращаем
        return []

      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines.join('\n')
}

export default plain
