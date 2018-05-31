import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import ErrorMessage from './ErrorMessage'
import { connect } from 'react-redux'
import { View, FlatList, Dimensions, Image, Text, Linking, TouchableOpacity } from 'react-native'
import { scaleLength, binarySearch } from '../utils/helper'
import { setDimensions, setY, setPortraitOffsets, setLandscapeOffsets } from '../actions/index'

class SearchPage extends Component {
  initializeDimensions = () => {
    const {height, width} = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
  }

  updateDimensions = () => {
    const {height, width} = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
    // if (height < width) {
    //   this.refs.listRef.scrollToIndex({ index: 15, viewOffset: 0 })
    // }
    // this.resetListPosition(width, height)
  }

  // when rotating device, make sure that images seen before roughly match images
  // seen after
  resetListPosition = (width, height) => {
    let screenIndex
    let currentY = this.props.currentY
    if (width <= height) {
      screenIndex = binarySearch(currentY, this.props.portraitOffsets)
    } else {
      console.log('currentY: ', currentY)
      console.log('landscapeOffsets: ', this.props.landscapeOffsets)
      screenIndex = binarySearch(currentY, this.props.landscapeOffsets)
      console.log('screenIndex: ', screenIndex)
    }
    if (screenIndex >= 1) {
      this.refs.listRef.scrollToIndex({ index: 28, viewOffset: 0 })
    }
  }

  componentDidMount() {
    this.initializeDimensions()
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  // Important to stop updating state after unmount
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateDimensions);
  }

  // myMove() {
  //   // let yOffset = event.nativeEvent.contentOffset.y
  //   // let contentHeight = event.nativeEvent.contentSize.height
  //   // console.log('yOffset: ', yOffset)
  //   // console.log('contentHeight: ', contentHeight)
  //   this.refs.listRef.scrollToIndex({ index: 15, viewOffset: 0 })
  // }

  handleScroll = (event) => {
    this.props.dispatch(setY(event.nativeEvent.contentOffset.y))
    console.log(event.nativeEvent.contentOffset.y);
  }



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

  // <TouchableOpacity onPress={() => this.myMove()}>
  //   <Text style={{fontSize: 24}}>Hello</Text>
  // </TouchableOpacity>
  render() {
    // set wider left and right margins when in landscape mode
    // const sideMargin = (this.props.screenHeight >= this.props.screenWidth) ? 20 : 40
    const sideMargin = 20
    // let level = 0
    return (
      <View style={{flex: 1}}>
        <SearchField listRef={this.refs.listRef}/>
        {this.props.querySuccess &&
          <FlatList
            // getItemLayout={(data, index) => (
            //   {length: 80, offset: 80 * index, index}
            // )}
            onScroll={this.handleScroll}
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
                    width={Math.min(this.props.screenWidth,this.props.screenHeight) - 2 * sideMargin}
                    height={scaleLength(Math.min(this.props.screenWidth,this.props.screenHeight) - 2 * sideMargin, item.webformatWidth, item.webformatHeight)}
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
    portraitOffsets: state.portraitOffsets,
    landscapeOffsets: state.landscapeOffsets,
    currentY: state.currentY,
  }
}

export default connect(mapStateToProps)(SearchPage)
