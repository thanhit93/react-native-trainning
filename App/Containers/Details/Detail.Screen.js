import React, { Component } from 'react'
import { ActivityIndicator, View, FlatList, Text } from 'react-native'
import connect from 'react-redux/es/connect/connect'
// Styles
import styles from './Detail.Styles'
import { DetailAction } from './Detail.Action'

class DetailScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
  }

  render () {
    const { changePassword: { data, isFetching } = {} } = this.props.detail
    /*const data = this.props.detail.user ? this.props.detail.user.data : []
    const isFetching = this.props.detail.user ? this.props.detail.user.isFetching : false*/
    const { isRefreshing } = this.state
    return (
      <View style={styles.mainContainer}>

        {
          isFetching ? <ActivityIndicator size={'large'} color={'#000'}/> : null
        }

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          automaticallyAdjustContentInsets={false}
          renderItem={this.renderItem}
          refreshing={isRefreshing}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={this.spaceLine}/>
      </View>
    )
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 30, backgroundColor: 'pink', justifyContent: 'center' }}>
        {/*<Text style={{ marginHorizontal: 10 }}>{`${item.id}-${item.name}`}</Text>*/}
        <Text style={{ marginHorizontal: 10 }}>{item.id + "-" + item.name}</Text>
      </View>
    )
  }

  spaceLine = () => {
    return (<View style={styles.viewUnderlineHorizontal}/>)
  }

  componentDidMount () {
    /*let body = {
      username: 'thanh'
    }
    this.props.onGetUser(DetailAction.requestFetchUser(body))*/
    this.callApiChangePassword()
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
