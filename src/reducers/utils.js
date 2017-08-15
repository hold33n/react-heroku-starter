import {List, OrderedMap} from 'immutable'

export function arrayToImmutable(jsArr, RecordType) {
  return jsArr.reduce((acc, el) => {
    return acc.push(new RecordType(el))
  }, new List([]))
}

export function objectToImmutable(jsObj, RecordType) {
  return jsObj.reduce((acc, el) => {
    return acc.set(el.id, new RecordType(el))
  }, new OrderedMap({}))
}
