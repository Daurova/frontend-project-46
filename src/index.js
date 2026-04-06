// import _ from 'lodash'

import parseFile from './parsers.js'
import buildDiff from './diffBuilder/diffBuilder.js'
import getFormat from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  const exractedFormatFunction = getFormat(format)

  if (format === 'stylish' || format === 'plain' || format === 'json') {
    return exractedFormatFunction(diff)
  }

  console.log('Данные из файлов:')
  console.log('file1:', data1)
  console.log('file2:', data2)
  console.log('формат:', format)

  throw new Error (`Unknown format: ${format}`)
}

export default genDiff
