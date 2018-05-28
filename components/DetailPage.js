import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

class DetailPage extends Component {
  render() {
    console.log('The page is appearing!')
    // FlatList used to save memory for recycled views
    return (
      <View style={{backgroundColor: '#23d4b1', height: 300, width: 300}}>
        <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
          {this.props.currentUser}
        </Text>
        <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
          {this.props.currentTags}
        </Text>
        <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
          {this.props.currentResolution}
        </Text>
        <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
          Hello
        </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentTags: state.currentTags,
    currentResolution: state.currentResolution,
  }
}

export default connect(mapStateToProps)(DetailPage)
