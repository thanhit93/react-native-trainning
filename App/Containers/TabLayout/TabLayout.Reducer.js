import { TestUIType } from './TabLayout.Action'
import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  email: ''
})
/* ------------- Reducers ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [TestUIType.UPDATE_EMAIL_VALUE]: (state, action) => {
    return {
      ...state,
      email: action.input
    }
  }
}) 
