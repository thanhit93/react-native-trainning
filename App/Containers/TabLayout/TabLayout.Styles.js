import { StyleSheet, Dimensions } from 'react-native'
const {width} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  center: {
    alignSelf: 'center'
  },
  vTouch: {
    width: 100, height: 30, backgroundColor: 'blue', borderRadius: 3,
    justifyContent: 'center', alignItems: 'center'
  },
  txtGoToDetail: {
    color: '#fff', fontSize: 12
  },
  indicator: {
    height: 3
  },
  tabbar: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    backgroundColor: '#eee',
    flex: 1
  },
  tab: {
    height: 50
  },
  label: {
    color: 'transparent',
    fontWeight: '400'
  },
  tabIconContainer: {
    width: width / 2,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },

})
