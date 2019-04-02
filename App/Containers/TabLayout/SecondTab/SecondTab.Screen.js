import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import _ from 'lodash'
const { width, height } = Dimensions.get('window')

export default class SecondTabScreen extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  render () {
    const { item } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: 'pink', justifyContent: 'center' }}>
        <Text>Page 2</Text>
      </View>)
  }

}
