import {List} from 'immutable'

export function arrayToImmutable(jsArr: any[], RecordType: any): List<any[]> {
  return jsArr.reduce((acc: List<any[]>, el: any) => {
    return acc.push(new RecordType(el))
  }, List([]))
}

// export function objectToImmutable(jsObj: object, RecordType: any): OrderedMap<K, V> {
//   return jsObj.reduce((acc, el) => {
//     return acc.set(el.id, new RecordType(el))
//   }, new OrderedMap({}))
// }
