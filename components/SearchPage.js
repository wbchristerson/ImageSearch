import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import { connect } from 'react-redux'
import { View, FlatList, Dimensions } from 'react-native'
import { scaleLength } from '../utils/helper'
import { setDimensions } from '../actions/index'

class SearchPage extends Component {
  updateDimensions = () => {
    var {height, width} = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
  }

  componentDidMount() {
    this.updateDimensions()
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  // Important to stop updating state after unmount
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateDimensions);
  }


  render() {
    // set wider left and right margins when in landscape mode
    const sideMargin = (this.props.screenHeight >= this.props.screenWidth) ? 20 : 40

    return (
      <View>
        <SearchField/>
        <FlatList
          data={this.props.resultList}
          keyExtractor={() => Math.random().toString(36).substr(2, 9)}
          renderItem={({item}) => (
            <ImageTile
              source={item.webformatURL}
              sourceWidth={item.webformatWidth}
              sourceHeight={item.webformatHeight}
              width={this.props.screenWidth}
              height={scaleLength(this.props.screenWidth - 2 * sideMargin, item.webformatWidth, item.webformatHeight)}
              objRef={this}
              user={item.user}
              tags={item.tags}
              resolution={item.recordedWidth.toString() + ' x ' + item.recordedHeight.toString()}
              sideMargin={sideMargin}/>
          )}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    showingResults: state.showingResults,
    resultList: state.resultList,
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
  }
}

export default connect(mapStateToProps)(SearchPage)
