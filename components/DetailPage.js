import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { scaleImageHeight, splitTags } from '../utils/helper'
import { setDimensions } from '../actions/index'

class DetailPage extends Component {
  updateDimensions = () => {
    var {height, width} = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
  }

  componentDidMount() {
    // const {height, width} = Dimensions.get('window')
    // this.props.dispatch(setDimensions(width, height))

    this.updateDimensions()
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.updateDimensions);
    }

  render() {
    // FlatList used to save memory for recycled views
    // <View style={{flex: 1, backgroundColor: '#23d4b1', height: 300, width: 300}}>
    // </View>

    // var {height, width} = Dimensions.get('window')
    // console.log('Height: ', height)
    // console.log('Width: ', width)

    // style={{width: this.props.currentWidth,
    //         height: this.props.currentHeight}}

    // contentContainerStyle={{alignItems: 'center'}}


    // prevent image from being stretched wider than its actual width
    width = Math.min(this.props.screenWidth, this.props.currentWidth)
    // image margin offset
    offset = (this.props.screenWidth - width) / 2
    textOffset = Math.max(offset, 20)
    return (
      <ScrollView>
        <Image
          source={{uri: this.props.currentSource}}
          style={{width: width, height: scaleImageHeight(width, this.props.currentWidth, this.props.currentHeight), marginLeft: offset, marginRight: offset}}/>
        <View style={{marginTop: 10, marginBottom: 10, marginLeft: textOffset, marginRight: textOffset}}>
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
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
  }
}

export default connect(mapStateToProps)(DetailPage)
