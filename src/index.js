import parseFile from './parsers.js'
import _ from 'lodash'

const stringifyValue = (value) => {
  if (typeof value === 'string') {
    return value
  }
  else {
    return String(value)
  }
}

const stylishDiff = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)))

  const lines = allKeys.flatMap((key) => {
    const has1 = _.has(obj1, key)
    const has2 = _.has(obj2, key)

    // Ключ только во втором файле
    if (!has1 && has2) {
      return `  + ${key}: ${stringifyValue(obj2[key])}`
    }
    // Ключ только в первом файле
    if (has1 && !has2) {
      return `  - ${key}: ${stringifyValue(obj1[key])}`
    }
    // Ключ есть в обоих
    if (_.isEqual(obj1[key], obj2[key])) {
      return `    ${key}: ${stringifyValue(obj1[key])}`
    }
    // Значения отличаются — возвращаем массив из двух строк
    return [
      `  - ${key}: ${stringifyValue(obj1[key])}`,
      `  + ${key}: ${stringifyValue(obj2[key])}`,
    ]
  })

  return `{\n${lines.join('\n')}\n}`
}

const genDiff = (filepath1, filepath2, format) => {
  // Здесь будет логика сравнения файлов
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  console.log('Данные из файлов:')
  console.log('file1:', data1)
  console.log('file2:', data2)
  console.log('формат:', format)

  // Вернем пока просто сообщение
  return stylishDiff(data1, data2)
}

export default genDiff
