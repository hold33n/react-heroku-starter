import {all} from 'redux-saga/effects'
import {appName} from '../constants'
import {IProduct} from '_pages/HomePage/interface'
import {Record, List} from 'immutable'
import {IAction} from './interface'
import {createSelector} from 'reselect'
import {arrayToImmutable} from './utils'

/**
 * Constants
 * */
export const moduleName: string = 'productList'
const prefix: string = `${appName}/${moduleName}`

export const ADD_PRODUCT: string = `${prefix}/ADD_PRODUCT`


/**
 * Reducer
 * */

const ItemRecord = Record({
  id: '',
  name: '',
  image: '',
  dimensions: '',
  weight: null,
  color: '',
  price: null
})

let Mock = arrayToImmutable([
  {
    id: 0,
    name: 'Item 1',
    image: 'http://google.com.ua',
    dimensions: 'google.com.ua',
    weight: 23,
    color: 'Red',
    price: 23
  },
  {
    id: 1,
    name: 'Item 2',
    image: 'ds',
    dimensions: 'http://google.com.ua',
    weight: 5,
    color: 'Blue',
    price: 32
  },
  {
    id: 2,
    name: 'Item 3',
    image: 'ds',
    dimensions: 'http://google.com.ua',
    weight: 52332,
    color: 'Cheese',
    price: 3
  },
  {
    id: 3,
    name: 'Item 4',
    image: 'ds',
    dimensions: 'http://google.com.ua',
    weight: 2,
    color: 'Blue',
    price: 23
  },
  {
    id: 4,
    name: 'Item 5',
    image: 'ds',
    dimensions: 'http://google.com.ua',
    weight: 3,
    color: 'Violet',
    price: 32434
  },
  {
    id: 6,
    name: 'Item 7',
    image: 'ds',
    dimensions: 'http://google.com.ua',
    weight: 32,
    color: 'Blue',
    price: 324
  },
  {
    id: 7,
    name: 'Item 8',
    image: 'dsasd',
    dimensions: 'http://google.com.ua',
    weight: 3,
    color: 'Yellow',
    price: 23
  },
  {
    id: 8,
    name: 'Item 9',
    image: 'ds',
    dimensions: 'http://google.com.ua',
    weight: 345,
    color: 'Green',
    price: 12
  },

], ItemRecord)

export const ReducerRecord = Record({
  productsList: List(Mock)
})



export default function productListReducer(state = new ReducerRecord(), action: IAction) {
  const {type, payload} = action

  switch (type) {
    case(ADD_PRODUCT):
      console.log(state, state.get('productsList'))
      
      return state
        .setIn(['productsList', state.get('productsList').size], new ItemRecord({
          id: state.get('productsList').size,
          name: payload.newProduct.name,
          image: payload.newProduct.image,
          dimensions: payload.newProduct.dimensions,
          weight: payload.newProduct.weight,
          color: payload.newProduct.color,
          price: payload.newProduct.price
        }))

  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state: any): any => state[moduleName]
export const productsListSelector = createSelector(stateSelector, (state: any): any => state.get('productsList').toJS())

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