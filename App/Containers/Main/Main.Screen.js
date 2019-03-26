import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Body, Container, Content, Header, Title } from 'native-base'

import MainStyles from './Main.Styles'
import Config from 'react-native-config'
import images from '../../Themes/Images'

export default class MainScreen extends Component {

  render () {
    return (
      <Container>
        <Header>
          <Body>
          <Title>{Config.ROOT_URL}</Title>
          </Body>
        </Header>
        <Content>

          <View style={MainStyles.container}>
            <View style={MainStyles.center}>
              <Text style={{
                fontFamily: 'Roboto-Light'
              }}>This is main</Text>

            </View>

            <Image source={images.hamburger}/>

            <TouchableOpacity onPress={this.onGoToDetail} style={MainStyles.vTouch}>
              <Text style={MainStyles.txtGoToDetail}>Go To Detail</Text>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    )
  }

  onGoToDetail=()=>{
    const {navigate} = this.props.navigation
    navigate('DetailScreen')
  }
}
