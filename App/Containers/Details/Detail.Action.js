import { call, put } from 'redux-saga/effects'
import { isNil } from 'ramda'
import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  // get user
  requestFetchUser: ['body'],
  fetchUserSuccess: ['data'],
  fetchUserFailure: ['error'],
  fetchUserClean : [],
  // change password
  requestChangePassword: ['body'],
  postChangePasswordSuccess: ['data'],
  postChangePasswordFailure: ['error'],
  postChangePasswordClean : []
})
export const DetailType = Types
export const DetailAction = Creators
export const DetailFunction = {
  onFetchUser,
  onChangePassword
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

function * onChangePassword (api, action) {
  const {body} = action
  const response = yield call(api.onChangePasswordApi, body)
  if (response.ok && response.status === 200) {
    yield put(DetailAction.postChangePasswordSuccess(response.data))
  } else {
    if (!isNil(response.problem) && (response.problem === 'NETWORK_ERROR'
      || response.problem === 'TIMEOUT_ERROR')) {
      yield put(DetailAction.postChangePasswordFailure(
        {error: true,
          errors: [{ 'errorMessage': 'The internet connection is not available. Please turn it on and try again!', 'errorCode': 8100 }]}))
    } else {
      yield put(DetailAction.postChangePasswordFailure(response.data))
    }
  }
}
