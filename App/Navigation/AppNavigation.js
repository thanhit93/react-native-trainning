import { createAppContainer, createStackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/Launch/Launch.Screen'
import MainScreen from '../Containers/Main/Main.Screen'
import DetailScreen from '../Containers/Details/Detail.Screen'
import TestUIScreen from '../Containers/TestUI/TestUI.Screen'
import TabLayoutScreen from '../Containers/TabLayout/TabLayout.Screen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  MainScreen: { screen: MainScreen },
  DetailScreen: { screen: DetailScreen },
  TestUIScreen: { screen: TestUIScreen },
  TabLayoutScreen: { screen: TabLayoutScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header,
    gesturesEnabled: false
  }
})

export default createAppContainer(PrimaryNav)
