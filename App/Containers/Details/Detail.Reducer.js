import { DetailType } from './Detail.Action'
import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  data: null,
  isFetching: false,
  error: false
})
/* ------------- Reducers ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [DetailType.REQUEST_FETCH_USER]: (state, action) => {
    return {...state,
      data: null,
      isFetching: true,
      error: false
    }
  },
  [DetailType.FETCH_USER_SUCCESS]: (state, action) => {
    console.log('FETCH_USER_SUCCESS', action.data)
    return {
      ...state,
      data: action.data.items,
      isFetching: false,
      error: false
    }
  },
  [DetailType.FETCH_USER_FAILURE]: (state, action) => {
    console.log('FETCH_USER_FAILURE', action.error)
    return {
      ...state,
      data: null,
      isFetching: false,
      error: action.error
    }
  },
  [DetailType.FETCH_USER_CLEAN]: (state, action) => {
    return {
      ...state,
      data: null,
      isFetching: false,
      error: false
    }
  }
}) 
