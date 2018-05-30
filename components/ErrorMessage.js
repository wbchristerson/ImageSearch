import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

// a component to display a message when the asynchronous request fails, for
// example, if the hourly request limit is exceeded
class ErrorMessage extends Component {
  render() {
    return(
      <View style={{ width: this.props.screenWidth, height: 200, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 24}}>Your query failed.</Text>
        <Text style={{fontSize: 24}}>Please try again later.</Text>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    screenWidth: state.screenWidth,
  }
}

export default connect(mapStateToProps)(ErrorMessage)
