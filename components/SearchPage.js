import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import { connect } from 'react-redux'
import { View, Image, FlatList } from 'react-native'
import { scaleLength } from '../utils/helper'

class SearchPage extends Component {
  render() {
    // FlatList used to save memory for recycled views
    return (
      <View>
        <SearchField/>
        <FlatList
          data={this.props.resultList}
          renderItem={({item}) => (
            <ImageTile source={item.webformatURL}
              width={300}
              height={scaleLength(item.webformatWidth, item.webformatHeight)}
              objRef={this}
              user={item.user}
              tags={item.tags}
              resolution={item.recordedWidth.toString() + ' x ' + item.recordedHeight.toString()}/>
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
