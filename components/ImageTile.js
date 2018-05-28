import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goToImage, setCurrentImage } from '../actions/index'
import { Text, View, Image, TouchableOpacity } from 'react-native'

class ImageTile extends Component {
  setChosenImage = () => {
    this.props.dispatch(setCurrentImage(this.props.user, this.props.tags,
      this.props.resolution))
  }

  render() {
    return(
      <View>
        <TouchableOpacity onPress={() => {
          this.setChosenImage()
          this.props.objRef.props.navigation.navigate(
          'DetailPage',
          { entryId: { newTitle: 'Hi'}})}}>
          <Image source={{uri: this.props.source}}
            style={{width: this.props.width, height: this.props.height}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    imageId: state.imageId
  }
}

export default connect(mapStateToProps)(ImageTile)
