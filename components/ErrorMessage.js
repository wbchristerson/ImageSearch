import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'

// a component to display a message when the asynchronous request fails, for
// example, if the hourly request limit is exceeded
class ErrorMessage extends Component {
  render() {
    return(
      <View style={[styles.errorView, {width: this.props.screenWidth}]}>
        <Text style={{fontSize: 24}}>Your query failed.</Text>
        <Text style={{fontSize: 24}}>Please try again later.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorView: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function mapStateToProps (state) {
  return {
    screenWidth: state.screenWidth,
  }
}

export default connect(mapStateToProps)(ErrorMessage)
