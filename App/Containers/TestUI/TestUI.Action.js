import { call, put } from 'redux-saga/effects'
import { isNil } from 'ramda'
import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  // get user
  updateEmailValue: ['input'],
})
export const TestUIType = Types
export const TestUIAction = Creators
export const TestUIFunction = {

}
