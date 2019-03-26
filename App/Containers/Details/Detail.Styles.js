import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  viewUnderlineHorizontal: {
    height: 1, width: '100%', backgroundColor: 'rgb(189,189,189)'
  }
})
