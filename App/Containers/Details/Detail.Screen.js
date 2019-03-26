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
    const { data, isFetching } = this.props.detail
    const {isRefreshing} = this.state
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
        <Text style={{marginHorizontal: 10}}>{item.login}</Text>
      </View>
    )
  }

  spaceLine = () => {
    return (<View style={styles.viewUnderlineHorizontal}/>)
  }

  componentDidMount () {
    let body = {
      username: 'thanh'
    }
    this.props.onGetUser(DetailAction.requestFetchUser(body))
  }

}

function mapStateToProps (state) {
  return {
    detail: state.detail
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onGetUser: (request) => dispatch(request)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailScreen)
