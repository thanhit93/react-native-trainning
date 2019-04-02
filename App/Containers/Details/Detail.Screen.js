import React, { Component } from 'react'
import { ActivityIndicator, View, FlatList, Image, Text } from 'react-native'
import connect from 'react-redux/es/connect/connect'
// Styles
import styles from './Detail.Styles'
import { DetailAction } from './Detail.Action'
import ListItem from '../../Components/ListItem'
import images from '../../Themes/Images'

class DetailScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
  }

  render () {
    const {
      changePassword: { data: passData, isFetching } = {},
      user: { data: userData } = {}
    } = this.props.detail
    /*const data = this.props.detail.user ? this.props.detail.user.data : []
    const isFetching = this.props.detail.user ? this.props.detail.user.isFetching : false*/
    const { isRefreshing } = this.state
    return (
      <View style={styles.mainContainer}>

        {
          isFetching ? <ActivityIndicator size={'large'} color={'#000'}/> : null
        }

        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          automaticallyAdjustContentInsets={false}
          renderItem={this.renderItem}
          refreshing={isRefreshing}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={this.spaceLine}/>

          {/*test view absolute*/}
          <View style={{width: 50, height: 50, backgroundColor: 'gray', borderRadius: 25}}>
            <Image style={{flex: 1}} source={images.buttonBackground}/>
            <View style={{position: 'absolute', right: 10, bottom: 10, flexDirection: 'row-reverse'}}>

            </View>
          </View>
      </View>
    )
  }

  renderItem = ({ item, index }) => {
    return <ListItem item={item}/>
  }

  spaceLine = () => {
    return (<View style={styles.viewUnderlineHorizontal}/>)
  }

  componentDidMount () {
    let body = {
      username: 'thanh'
    }
    this.props.onGetUser(DetailAction.requestFetchUser(body))
    //this.callApiChangePassword()
  }

  callApiChangePassword = () => {
    this.props.onChangePasswordRequest(DetailAction.requestChangePassword({
      page: 1,
      pageSize: 10,
      data: { filterProvince: 12 }
    }))
  }

}

function mapStateToProps (state) {
  return {
    detail: state.detail
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onGetUser: (request) => dispatch(request),
    onChangePasswordRequest: (request) => dispatch(request)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailScreen)
