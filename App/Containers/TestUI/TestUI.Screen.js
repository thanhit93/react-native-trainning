import React, { Component } from 'react'
import { Text, View, TextInput, Animated, Dimensions, Keyboard, TouchableOpacity, BackHandler } from 'react-native'
import { Body, Container, Content, Header, Title, Button } from 'native-base'

import style from './TestUI.Styles'
import Config from 'react-native-config'
import images from '../../Themes/Images'
import I18n from '../../I18n/'
import connect from 'react-redux/es/connect/connect'
import { TestUIAction } from './TestUI.Action'
import SimpleToast from 'react-native-simple-toast'

const { width, height } = Dimensions.get('window')
import _ from 'lodash'

class TestUIScreen extends Component {

  constructor (props) {
    super(props)
    this.backPress = this.handleBackPress.bind(this)
    this.animateBottomValue = new Animated.Value(0)
    this.state = {
      keyboardHeight: 32
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

  shouldComponentUpdate (nextProps, nextState) {
    return !_.isEqual(nextProps.testUI, this.props.testUI)
  }

  render () {
    const { testUI: { email = '' } } = this.props
    SimpleToast.show('email')
    const marginBottom = this.animateBottomValue.interpolate({
      inputRange: [0, 1],
      outputRange: [32, this.state.keyboardHeight]
    })
    return (
      <Animated.View style={{ padding: 10, marginBottom }}>
        <Button title={'Back'} onPress={this.handleBackPress} />
        <TextInput
          ref={(ref) => this.emailInput = ref}
          style={{ height: 40 }}
          value={email}
          autoCapitalize={'none'}
          numberOfLines={1}
          keyboardType={'email-address'}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="you@example.com"
          placeholderTextColor={'#9E9E9E'}
          returnKeyType="search"
          onSubmitEditing={(event) => {
            this.passInput.focus()
          }}
          onEndEditing={(text) => {
            //this.checkShowErrorLocal()
          }}
          onChangeText={this.onChangeText}/>

        <TextInput
          ref={(ref) => this.passInput = ref}
          style={{
            height: 40, backgroundColor: 'gray', borderRadius: 4,
            borderWidth: 1, borderColor: '#000', padding: 5
          }}
          value={this.state.email}
          autoCapitalize={'none'}
          numberOfLines={1}
          placeholder="you@example.com"
          placeholderTextColor={'#9E9E9E'}
          returnKeyType="next"
          secureTextEntry
          onSubmitEditing={(event) => {

          }}
          onEndEditing={(text) => {

          }}
          onChangeText={this.onChangeText}/>
        <TouchableOpacity onPress={() => this.setEmail('thnah')}>
          <Text>dhdhdgdggdg</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  setEmail = (value) => {
    this.setState({ email: value })
  }

  onChangeText = (text) => {
    this.props.onUpdateEmail(TestUIAction.updateEmailValue(text.trim()))
  }

  componentDidMount (): void {

  }

  componentWillUnmount (): void {
    BackHandler.removeEventListener('hardwareBackPress', this.backPress)
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener && this.keyboardDidHideListener.remove()
    this.props.onUpdateEmail(TestUIAction.updateEmailValue(''))
  }

}

function mapStateToProps (state) {
  return {
    testUI: state.testUI
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onUpdateEmail: (request) => dispatch(request)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(TestUIScreen)
