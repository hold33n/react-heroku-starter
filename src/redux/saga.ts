import {all} from 'redux-saga/effects'
import {saga as chatSaga} from '../ducks/module'

export default function* saga() {
  yield all([
    chatSaga()
  ])
}