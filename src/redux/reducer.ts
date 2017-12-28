import {combineReducers} from 'redux'
import testReducer, {moduleName as testModule} from '../ducks/module'

export default combineReducers({
  [testModule]: testReducer,
})
