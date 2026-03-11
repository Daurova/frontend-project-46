import _ from 'lodash'

const isObject = value => value && typeof value === 'object' && !Array.isArray(value)

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)))
  return keys.map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: value2 }
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: value1 }
    }
    if (isObject(value1) && isObject(value2)) {
      const children = buildDiff(value1, value2)
      return { key, type: 'nested', children }
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 }
    }
    return {
      key, type: 'changed', oldValue: value1, newValue: value2,
    }
  })
}

export default buildDiff
