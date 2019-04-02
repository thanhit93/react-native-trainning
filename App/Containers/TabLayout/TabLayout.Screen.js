import React, { Component } from 'react'
import { Animated, BackHandler, Dimensions, Keyboard, Text, View } from 'react-native'

import style from './TabLayout.Styles'
import connect from 'react-redux/es/connect/connect'
import { TabLayoutAction } from './TabLayout.Action'
import { TabBar, TabView } from 'react-native-tab-view'
import FirstTabScreen from './FirstTab/FirstTab.Screen'
import SecondTabScreen from './SecondTab/SecondTab.Screen'

const { width, height } = Dimensions.get('window')

class TabLayoutScreen extends Component {

  constructor (props) {
    super(props)
    this.backPress = this.handleBackPress.bind(this)
    this.animateBottomValue = new Animated.Value(0)
    this.state = {
      keyboardHeight: 32,
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
    }
  }

  componentWillMount (): void {
    BackHandler.addEventListener('hardwareBackPress', this.backPress)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow (e) {
    let newSize = e.endCoordinates.height
    this.setState({ keyboardHeight: newSize }, () => {
      Animated.timing(
        this.animateBottomValue,
        {
          toValue: 1,
          duration: 300,
          easing: Easing.linear
        }
      ).start(() => {
        ///đhdhdhd

      })
    })
  }

  keyboardWillHide (e) {
    this.setState({ keyboardHeight: 32 }, () => {
      Animated.timing(
        this.animateBottomValue,
        {
          toValue: 0,
          duration: 300,
          easing: Easing.linear
        }
      ).start()
    })
  }

  handleBackPress = () => {
    Keyboard.dismiss()
    this.props.navigation.goBack()
    return true
  }

  render () {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        onIndexChange={index => this.setState({ index: index })}
        tabBarPosition={'bottom'}
        renderTabBar={this._renderTabBar}
      />
    )
  }

  _renderScene = ({ route }) => {
    /*if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 2) {
      return <View />;
    }*/
    switch (route.key) {
      case 'first':
        return (
          <FirstTabScreen
            style={{ flex: 1 }}
            navigation={this.props.navigation}
            props={this.props}
            index={this.state.index}/>
        )
      case 'second':
        return (
          <SecondTabScreen
            style={{ flex: 1 }}
            navigation={this.props.navigation}
            props={this.props}
            index={this.state.index}/>
        )
      default:
        break
    }
  }

  _renderTabBar = props => {
    return (
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TabBar
          {...props}
          onTabPress={(tab) => {
            this.setState({ index: tab.index })
          }}
          useNativeDriver
          pressColor={'transparent'}
          pressOpacity={70}
          renderIcon={this._renderIcon}
          renderBadge={this._renderBadge}
          renderLabel={this._renderLabel}
          indicatorStyle={style.indicator}
          style={style.tabbar}
          tabStyle={style.tab}
          labelStyle={style.label}
          bounces={true}/>
      </View>
    )
  }

  _renderIcon = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <View style={[style.tabIconContainer]}>
            <Text>{route.title}</Text>
          </View>
        )
      case 'second':
        return (
          <View style={style.tabIconContainer}>
            <Text>{route.title}</Text>
          </View>
        )
      default:
        return null
    }
  }

  _renderLabel= ({ route }) => {
  }

  _renderBadge = ({ route }) => {
  }

  onChangeText = (text) => {
    this.props.onUpdateEmail(TabLayoutAction.updateEmailValue(text.trim()))
  }

  componentDidMount (): void {

  }

  componentWillUnmount (): void {
    BackHandler.removeEventListener('hardwareBackPress', this.backPress)
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener && this.keyboardDidHideListener.remove()
    this.props.onUpdateEmail(TabLayoutAction.updateEmailValue(''))
  }

}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onUpdateEmail: (request) => dispatch(request)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(TabLayoutScreen)
