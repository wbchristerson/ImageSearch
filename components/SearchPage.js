import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import { connect } from 'react-redux'
import { View, Image, FlatList } from 'react-native'

class SearchPage extends Component {
  render() {
    // FlatList used to save memory for recycled views
    return (
      <View>
        <SearchField/>
        <Image source={{uri: 'http://smalldata.io/img/sdl_logo.png'}}
          style={{width: 150, height: 99}}/>
        <FlatList
          data={this.props.resultList}
          renderItem={({item}) => (
            <ImageTile source={item.previewURL} width={item.previewWidth}
              height={item.previewHeight}/>
          )}/>
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
