import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Dimensions, Animated, StyleSheet } from 'react-native'
import { scaleImageHeight, splitTags } from '../utils/helper'
import { setDimensions } from '../actions/index'

class DetailPage extends Component {
  // for animation properties, there is no need to record information in the
  // redux store, so it is kept here in local state
  state = {
    opacity: new Animated.Value(0),
  }

  updateDimensions = () => {
    const { width, height } = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
  }

  componentDidMount() {
    const { opacity } = this.state
    Animated.timing(opacity, { toValue: 1, duration: 1000 })
      .start()
    this.updateDimensions()
    Dimensions.addEventListener("change", this.updateDimensions)
  }

  // stop updating state after unmount
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateDimensions)
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title,
    }
  };

  render() {
    const { opacity } = this.state
    // prevent image from being stretched wider than its actual width
    width = Math.min(this.props.screenWidth, this.props.currentWidth)
    // image margin offset
    offset = (this.props.screenWidth - width) / 2
    textOffset = Math.max(offset, 20)
    return (
      <ScrollView>
        <Animated.Image
          source={{uri: this.props.currentSource}}
          style={[{width: width, height: scaleImageHeight(width, this.props.currentWidth, this.props.currentHeight),
                    marginLeft: offset, marginRight: offset}, { opacity }]}/>
        <View style={[styles.viewStyle, {marginLeft: textOffset, marginRight: textOffset}]}>
          <Text style={styles.textStyle}>
            User: {this.props.currentUser}
          </Text>
          <Text style={[styles.textStyle, { marginTop: 5}]}>
            Resolution: {this.props.currentResolution}
          </Text>
          <Text style={[styles.textStyle, { marginTop: 5}]}>
            Tags: {splitTags(this.props.currentTags)}
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  textStyle: {
    flex: 1,
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

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
