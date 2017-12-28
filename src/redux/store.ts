import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import reducer from './reducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, {}, compose(
  applyMiddleware(sagaMiddleware),
  // applyMiddleware(thunk),
  // Remove it from production
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


sagaMiddleware.run(saga)
window.store = store

export default store
