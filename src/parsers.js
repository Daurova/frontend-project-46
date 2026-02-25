import { readFileSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getFormat = (filepath) => {
  const extention = path.extname(filepath).toLowerCase()
  return extention.slice(1)
}

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = readFileSync(absolutePath, 'utf-8')
  const format = getFormat(absolutePath)

  switch (format) {
    case 'json':
      return JSON.parse(content)
    case 'yaml':
    case 'yml':
      return yaml.load(content)
    default:
      throw new Error (`Unsupported file format: ${format}`)
  }
}

export default parseFile
