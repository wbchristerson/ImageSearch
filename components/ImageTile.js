import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goToImage, setCurrentImage } from '../actions/index'
import { Text, View, Image, TouchableOpacity } from 'react-native'

class ImageTile extends Component {
  setChosenImage = () => {
    this.props.dispatch(setCurrentImage(this.props.user, this.props.tags,
      this.props.resolution, this.props.source, this.props.sourceWidth,
      this.props.sourceHeight))
  }

  render() {
    query = this.props.currentQuery
    return(
      <View style={{marginLeft: this.props.sideMargin, marginRight: this.props.sideMargin, marginTop: 20, marginBottom: 20}}>
        <TouchableOpacity onPress={() => {
          this.setChosenImage()
          return this.props.objRef.props.navigation.navigate(
          'DetailPage', { title: query })}}>
          <Image source={{uri: this.props.source}}
            style={{width: this.props.width, height: this.props.height}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentQuery: state.currentQuery,
  }
}

export default connect(mapStateToProps)(ImageTile)
