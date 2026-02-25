import { test, expect } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

// Нормализуем окончания строк (CRLF -> LF) и удаляем лишние пробелы в начале/конце каждой строки?
// Но лучше просто привести к единому формату:
const normalizeLineEndings = str => str.replace(/\r\n/g, '\n').trim()

test('gendiff compares flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFixture('expected.txt')
  const result = genDiff(filepath1, filepath2)
  expect(normalizeLineEndings(result)).toBe(normalizeLineEndings(expected))
})

test('gendiff compares flat YAML files', () => {
  const filepath1 = getFixturePath('file1.yml')
  const filepath2 = getFixturePath('file2.yml')
  const expected = readFixture('expected.txt')
  const result = genDiff(filepath1, filepath2)
  expect(normalizeLineEndings(result)).toBe(normalizeLineEndings(expected))
})
