import { DetailType } from './Detail.Action'
import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  user: {
    data: null,
    isFetching: false,
    error: false
  },
  changePassword: {
    page: 1,
    pageSize: 10,
    canLoadMore: false,
    data: null,
    isFetching: false,
    error: false
  }
})
/* ------------- Reducers ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [DetailType.REQUEST_FETCH_USER]: (state, action) => {
    return {
      ...state,
      user: {
        data: null,
        isFetching: true,
        error: false
      }
    }
  },
  [DetailType.FETCH_USER_SUCCESS]: (state, action) => {
    console.log('FETCH_USER_SUCCESS', action)
    return {
      ...state,
      user: {
        data: action.data.items,
        isFetching: false,
        error: false
      }
    }
  },
  [DetailType.FETCH_USER_FAILURE]: (state, action) => {
    console.log('FETCH_USER_FAILURE', action.error)
    return {
      ...state,
      user: {
        data: null,
        isFetching: false,
        error: action.error
      }
    }
  },
  [DetailType.FETCH_USER_CLEAN]: (state, action) => {
    return {
      ...state,
      user: {
        data: null,
        isFetching: false,
        error: false
      }
    }
  },

  [DetailType.REQUEST_CHANGE_PASSWORD]: (state, action) => {
    let page = action.body && action.body.page ? action.body.page : 1
    let pageSize = action.body && action.body.pageSize ? action.body.pageSize : 10
    let previousChangePassword = {...state.changePassword}
    previousChangePassword.page = page
    previousChangePassword.pageSize = pageSize
    previousChangePassword.canLoadMore = false
    previousChangePassword.data = page === 1 ? null : previousChangePassword.data
    previousChangePassword.isFetching = true
    previousChangePassword.error = false
    return {
      ...state,
      changePassword: previousChangePassword
    }
  },
  [DetailType.POST_CHANGE_PASSWORD_SUCCESS]: (state, action) => {
    console.log('POST_CHANGE_PASSWORD_SUCCESS', action.data)
    let previousChangePassword = {...state.changePassword}
    previousChangePassword.canLoadMore = action.data.data &&
      action.data.data.length >= previousChangePassword.pageSize
    previousChangePassword.data = previousChangePassword.page === 1
      ? action.data.data : [...previousChangePassword.data, ...action.data.data]
    previousChangePassword.isFetching = false
    previousChangePassword.error = false
    console.log('dta', previousChangePassword)
    return {
      ...state,
      changePassword: previousChangePassword
    }
  },
  [DetailType.POST_CHANGE_PASSWORD_FAILURE]: (state, action) => {
    console.log('POST_CHANGE_PASSWORD_FAILURE', action.error)
    return {
      ...state,
      changePassword: {
        data: null,
        isFetching: false,
        error: action.error
      }
    }
  },
  [DetailType.POST_CHANGE_PASSWORD_CLEAN]: (state, action) => {
    return {
      ...state,
      changePassword: {
        page: 1,
        data: null,
        isFetching: false,
        error: false
      }
    }
  }
}) 
