import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import ErrorMessage from './ErrorMessage'
import { connect } from 'react-redux'
import { View, FlatList, Dimensions, Image, Text, Linking, TouchableOpacity } from 'react-native'
import { scaleLength } from '../utils/helper'
import { setDimensions, setY, setPortraitOffsets, setLandscapeOffsets } from '../actions/index'

class SearchPage extends Component {
  updateDimensions = () => {
    var {height, width} = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
  }

  componentDidMount() {
    // this.list.scrollToOffset({x: 0, y: 0, animated: true})
    this.updateDimensions()
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  // Important to stop updating state after unmount
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateDimensions);
  }

  // myMove() {
  //   let yOffset = event.nativeEvent.contentOffset.y
  //   let contentHeight = event.nativeEvent.contentSize.height
  //   console.log('yOffset: ', yOffset)
  //   console.log('contentHeight: ', contentHeight)
  //   this.refs.listRef.scrollToIndex({ index: 15, viewOffset: 0 })
  // }

  handleScroll = (event) => {
    this.props.dispatch(setY(event.nativeEvent.contentOffset.y))
    console.log(event.nativeEvent.contentOffset.y);
  }

  // <TouchableOpacity onPress={() => this.myMove()}>
  //   <Text style={{fontSize: 24}}>Hello</Text>
  // </TouchableOpacity>


  // // create a list of offsets of images from the beginning of the flatlist
  // createOffsetList = () => {
  //   portraitArr = [0]
  //   landscapeArr = [0]
  //   let width = this.props.screenWidth
  //   let height = this.props.screenHeight
  //   if (width > height) {
  //     let temp = width
  //     width = height
  //     height = temp
  //   }
  //   let newHeight
  //   for (let i = 0; i < this.props.resultList.length; i++) {
  //     newHeight = scaleLength(width - 40,
  //       this.props.resultList[i].webformatWidth,
  //       this.props.resultList[i].webformatHeight)
  //     portraitArr.push(height + 40)
  //     newHeight = scaleLength(height - 80,
  //       this.props.resultList[i].webformatWidth,
  //       this.props.resultList[i].webformatHeight)
  //     landscapeArr.push(height + 40)
  //   }
  //   this.props.dispatch(setPortraitOffsets(portraitArr))
  //   this.props.dispatch(setLandscapeOffsets(landscapeArr))
  // }

  render() {
    // set wider left and right margins when in landscape mode
    const sideMargin = (this.props.screenHeight >= this.props.screenWidth) ? 20 : 40
    let level = 0
    return (
      <View style={{flex: 1}}>
        <SearchField listRef={this.refs.listRef}/>
        {this.props.querySuccess &&
          <FlatList
            onScroll={this.handleScroll}
            // onViewableItemsChanged={({ viewableItems, changed }) => {
            //   console.log("Visible items are", viewableItems);
            //   console.log("Changed in this iteration", changed);
            // }}
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 50
            // }}

            // onViewableItemsChanged={this.onItemsChanges}
            ref='listRef' // for setting list to top on new queries
            data={this.props.resultList}
            keyExtractor={() => Math.random().toString(36).substr(2, 9)}
            renderItem={({item}) => {
              if (item.logo) {
                return (
                  <View style={{alignItems: 'center', marginTop: 3}}>
                    <Text>Images Provided By</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://pixabay.com/')}>
                      <Image source={{uri: 'https://pixabay.com/static/img/logo.png'}}
                        style={{width: 160, height: 31}} />
                    </TouchableOpacity>
                  </View>
                )
              } else {
                return (
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
                )
              }
            }
          }/>

        }
        {!this.props.querySuccess && <ErrorMessage/>}
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
    querySuccess: state.querySuccess,
  }
}

export default connect(mapStateToProps)(SearchPage)
