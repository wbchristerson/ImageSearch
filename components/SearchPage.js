import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import ErrorMessage from './ErrorMessage'
import { connect } from 'react-redux'
import { View, FlatList, Dimensions, Image, Text, Linking, TouchableOpacity } from 'react-native'
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
      <View style={{flex: 1}}>
        <SearchField/>
        {this.props.querySuccess &&
          <FlatList
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
