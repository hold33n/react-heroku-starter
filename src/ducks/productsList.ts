import {all} from 'redux-saga/effects'
import {appName} from '../constants'
import {IProduct} from '_pages/HomePage/interface'
import {Record, List} from 'immutable'
import {IAction} from './interface'
import {createSelector} from 'reselect'

/**
 * Constants
 * */
export const moduleName: string = 'productList'
const prefix: string = `${appName}/${moduleName}`

export const ADD_PRODUCT: string = `${prefix}/ADD_PRODUCT`


/**
 * Reducer
 * */
export const ReducerRecord = Record({
  productsList: List([])
})

export default function productListReducer(state = new ReducerRecord(), action: IAction) {
  const {type, payload} = action

  switch (type) {
    case(ADD_PRODUCT):
      return state
        .get('productList')
        .push(payload.newProduct)

  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state: any): any => state[moduleName]
export const productsListSelector = createSelector(stateSelector, (state: any): any => state.get('productList').toJS())

/**
 * Action Creators
 * */

export function addProduct(newProduct: IProduct): IAction {
  return {
    type: ADD_PRODUCT,
    payload: {newProduct}
  }
}

/**
 * Sagas
 * */

export function* saga() {
  yield all([])
}