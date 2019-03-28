import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Body, Container, Content, Header, Title, Button } from 'native-base'

import MainStyles from './Main.Styles'
import Config from 'react-native-config'
import images from '../../Themes/Images'
import I18n from '../../I18n/'
const {width, height} = Dimensions.get('window')

export default class MainScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      locale: I18n.locale.substr(0, 2)
    }
  }

  toogleLanguage = () => {
    let lang
    if (this.state.locale.indexOf('vi') > -1) {
      lang = 'en'
    } else {
      lang = 'vi'
    }
    I18n.initLanguage(lang)
    this.setState({ locale: lang })
  }

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
                fontFamily: 'IndieFlower.ttf'
              }}>This is main</Text>

            </View>

            <Text>{I18n.t('welcome')}</Text>
            <Button light onPress={() => {
              this.toogleLanguage()
            }}
            >
              <Text> I18n - {this.state.locale} </Text>
            </Button>

            <Image source={images.hamburger}/>

            <TouchableOpacity onPress={this.onGoToDetail} style={MainStyles.vTouch}>
              <Text style={MainStyles.txtGoToDetail}>Go To Detail</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: width/3, textAlign: 'center'}}>name 1</Text>
              <Text style={{flex: width/3, textAlign: 'center'}}>name 2</Text>
              <Text style={{flex: width/3, textAlign: 'center'}}>name 3</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 1, textAlign: 'center'}}>name 1</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>name 2</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>name 3</Text>
            </View>

            <View style={{alignItems: 'flex-end', height: 40, backgroundColor: 'blue'}}>
              <Text style={{flex: 1, textAlign: 'center'}}>name 1</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>name 2</Text>
              <Text style={{flex: 1, textAlign: 'center'}}>name 3</Text>
            </View>

            <View style={{width: 40, height: 40, backgroundColor: 'blue', borderRadius: 40 / 2, borderWidth: 2, borderColor: '#000'}}>

            </View>
          </View>

        </Content>
      </Container>
    )
  }

  onGoToDetail = () => {
    const { navigate } = this.props.navigation
    navigate('DetailScreen')
  }
}
