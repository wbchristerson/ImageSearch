import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'

class SearchPage extends Component {
  render() {
    // (this.props.showingResults && this.props.resultList.map((obj) => (
    //   <ImageTile source={obj.previewURL} width={obj.previewWidth}
    //   height={obj.previewHeight}/>
    // )))
    return(
      <View>
        <SearchField/>
        <Image source={{uri: 'http://smalldata.io/img/sdl_logo.png'}}
          style={{width: 150, height: 99}}/>
        {this.props.resultList.map((obj) => (
          <ImageTile source={obj.previewURL} width={obj.previewWidth}
            height={obj.previewHeight}/>
        ))}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    showingResults: state.showingResults,
    resultList: state.resultList,
  }
}

export default connect(mapStateToProps)(SearchPage)
