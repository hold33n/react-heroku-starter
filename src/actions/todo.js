import {CHANGE_TODO_ITEM_VALUE, SELECT_ITEM, DESELECT_ITEM, ADD_TODO_ITEM, SUCCESS, PROGRESS, FAIL} from '../constants'
// import axios from 'axios'


export function changeItemValue(itemId, newValue) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TODO_ITEM_VALUE + SUCCESS,
      payload: {itemId, newValue}
    })
  }
}

export function selectItem(itemId) {
  return (dispatch) => {
    dispatch({type: SELECT_ITEM,
      payload: {itemId}})
  }
}

export function deselectItem(itemId) {
  return (dispatch) => {
    dispatch({type: DESELECT_ITEM,
      payload: {itemId}})
  }
}

export function addItem() {
  return (dispatch) => {
    dispatch({type: ADD_TODO_ITEM})
  }
}