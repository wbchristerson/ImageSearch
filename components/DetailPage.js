import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { scaleImageHeight } from '../utils/helper'

class DetailPage extends Component {
  render() {
    console.log('The page is appearing!')
    // FlatList used to save memory for recycled views
    // <View style={{flex: 1, backgroundColor: '#23d4b1', height: 300, width: 300}}>
    // </View>
    var {height, width} = Dimensions.get('window')
    console.log('Height: ', height)
    console.log('Width: ', width)
    // style={{width: this.props.currentWidth,
    //         height: this.props.currentHeight}}

    // contentContainerStyle={{alignItems: 'center'}}
    return (
      <ScrollView>
        <Image
          source={{uri: this.props.currentSource}}
          style={{ width: width, height: scaleImageHeight(width, this.props.currentWidth, this.props.currentHeight)}}/>
        <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
          {this.props.currentUser}
        </Text>
        <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
          {this.props.currentTags}
        </Text>
        <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
          {this.props.currentResolution}
        </Text>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentTags: state.currentTags,
    currentResolution: state.currentResolution,
    currentSource: state.currentSource,
    currentWidth: state.currentWidth,
    currentHeight: state.currentHeight,
  }
}

export default connect(mapStateToProps)(DetailPage)
