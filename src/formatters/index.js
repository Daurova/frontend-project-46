import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = {
  stylish,
  plain,
  json,
}

const getFormat = (format) => {
  return formatters[format]
}

export default getFormat
