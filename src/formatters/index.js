import stylish from './stylish.js'
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
}

const getFormat = (format) => {
  return formatters[format]
}

export default getFormat
