import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goToImage } from './actions'

class ImageTile extends Component {
  render() {
    return(
      <Text>This is a test.</Text>
    )
  }
}

function mapStateToProps (state) {
  return {
    imageId: state.imageId
  }
}

export default connect(mapStateToProps)(ImageTile)
