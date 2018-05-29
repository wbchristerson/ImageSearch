import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { scaleImageHeight, splitTags } from '../utils/helper'

class DetailPage extends Component {
  render() {
    // FlatList used to save memory for recycled views
    // <View style={{flex: 1, backgroundColor: '#23d4b1', height: 300, width: 300}}>
    // </View>
    var {height, width} = Dimensions.get('window')
    console.log('Height: ', height)
    console.log('Width: ', width)
    // style={{width: this.props.currentWidth,
    //         height: this.props.currentHeight}}

    // contentContainerStyle={{alignItems: 'center'}}

    console.log('Tag List: ', this.props.currentTags)
    return (
      <ScrollView>
        <Image
          source={{uri: this.props.currentSource}}
          style={{width: width, height: scaleImageHeight(width, this.props.currentWidth, this.props.currentHeight)}}/>
        <View style={{padding: 10}}>
          <Text style={{flex: 1, fontSize: 24, alignItems: 'center', justifyContent: 'center'}}>
            User: {this.props.currentUser}
          </Text>
          <Text style={{flex: 1, fontSize: 24, marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
            Resolution: {this.props.currentResolution}
          </Text>
          <Text style={{flex: 1, fontSize: 24, marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
            Tags: {splitTags(this.props.currentTags)}
          </Text>
        </View>
      </ScrollView>
    )
  }
  // Tags: {splitTags(this.props.currentTags)}
  // <View style={{padding: 10}}>
  // </View>
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
