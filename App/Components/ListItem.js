import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import _ from 'lodash'
const { width, height } = Dimensions.get('window')

export default class ListItem extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !_.isEqual(nextProps.item, this.props.item)
  }

  render () {
    const { item } = this.props
    return (
      <View style={{ height: 30, backgroundColor: 'pink', justifyContent: 'center' }}>
        {/*<Text style={{ marginHorizontal: 10 }}>{`${item.id}-${item.name}`}</Text>*/}
        <Text style={{ marginHorizontal: 10 }}>{item.login}</Text>
      </View>)
  }

}
