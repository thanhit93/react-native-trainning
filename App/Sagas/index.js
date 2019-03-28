import { all, takeLatest } from 'redux-saga/effects'
import { StartupTypes } from '../Redux/StartupRedux'
import { startup } from './StartupSagas'

/* ------------ REDUX ------------ */
//@nhancv 2019-03-11
//TODO: Add REDUX here: Action, Function, Service
import { DetailType, DetailFunction } from '../Containers/Details/Detail.Action'
import DetailApi from '../Containers/Details/Detail.Api'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(DetailType.REQUEST_FETCH_USER, DetailFunction.onFetchUser, DetailApi.create()),
    takeLatest(DetailType.REQUEST_CHANGE_PASSWORD, DetailFunction.onChangePassword, DetailApi.create())

    //@nhancv 2019-03-11
    //TODO: redux flow configuration

  ])
}
