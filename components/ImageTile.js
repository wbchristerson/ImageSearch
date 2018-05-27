import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goToImage } from './actions'

class ImageTile extends Component {
  render() {
    return(
      <View>
        <Image source={{uri: this.props.source}}
          style={{width: 150, height: 150}}/>
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
