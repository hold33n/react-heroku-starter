import {CHANGE_TODO_ITEM_VALUE, SELECT_ITEM, DESELECT_ITEM, ADD_TODO_ITEM, SUCCESS} from '../constants'
import {todoList} from '../fixtures'
import {arrayToImmutable} from './utils'
import {Record} from 'immutable'

const todoItemRecord = Record({
  id: null,
  text: '',
  done: null,
})

const immutableTodoList = arrayToImmutable(todoList, todoItemRecord)


export default (todoList = immutableTodoList, action) => {
  const {type, payload} = action

  switch (type) {
  case (CHANGE_TODO_ITEM_VALUE + SUCCESS): {
    const itemKey = todoList.findKey((obj) => obj.get('id') === payload.itemId)

    return todoList
      .updateIn([itemKey, 'text'], () => payload.newValue)
  }

  case (SELECT_ITEM): {
    const itemKey = todoList.findKey((obj) => obj.get('id') === payload.itemId)

    return todoList
      .updateIn([itemKey, 'done'], () => true)
  }

  case (DESELECT_ITEM): {
    const itemKey = todoList.findKey((obj) => obj.get('id') === payload.itemId)

    return todoList
      .updateIn([itemKey, 'done'], () => false)
  }

  case (ADD_TODO_ITEM):
    return todoList.push(new todoItemRecord({
      id: todoList.size + 1,
      text: '',
      done: false
    })
    )


  }

  return todoList
}
