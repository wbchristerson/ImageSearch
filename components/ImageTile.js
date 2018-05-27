import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goToImage } from '../actions/index'
import { Text, View, Image } from 'react-native'

class ImageTile extends Component {
  render() {
    return(
      <View>
        <Image source={{uri: this.props.source}}
          style={{width: this.props.width, height: this.props.height}}/>
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
