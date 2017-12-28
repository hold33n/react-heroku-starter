import {combineReducers} from 'redux'
import productListReducer, {moduleName as productList} from '../ducks/productsList'

export default combineReducers({
  [productList]: productListReducer,
})
