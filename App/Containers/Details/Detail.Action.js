import { call, put } from 'redux-saga/effects'
import { isNil } from 'ramda'
import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  requestFetchUser: ['body'],
  fetchUserSuccess: ['data'],
  fetchUserFailure: ['error'],
  fetchUserClean : []
})
export const DetailType = Types
export const DetailAction = Creators
export const DetailFunction = {
  onFetchUser
}

function * onFetchUser (api, action) {
  const {body} = action
  const response = yield call(api.onFetchUserApi, body)
  if (response.ok && response.status === 200) {
    yield put(DetailAction.fetchUserSuccess(response.data))
  } else {
    if (!isNil(response.problem) && (response.problem === 'NETWORK_ERROR' || response.problem === 'TIMEOUT_ERROR')) {
      yield put(DetailAction.fetchUserFailure(
        {error: true,
          errors: [{ 'errorMessage': 'The internet connection is not available. Please turn it on and try again!', 'errorCode': 8100 }]}))
    } else {
      yield put(DetailAction.fetchUserFailure(response.data))
    }
  }
}
