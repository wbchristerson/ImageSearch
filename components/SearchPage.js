import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import ErrorMessage from './ErrorMessage'
import { connect } from 'react-redux'
import { View, FlatList, Dimensions, Image, Text, Linking, TouchableOpacity,
  StyleSheet } from 'react-native'
import { scaleLength, binarySearch } from '../utils/helper'
import { setDimensions } from '../actions/index'
import { AppLoading } from 'expo'

class SearchPage extends Component {
  updateDimensions = () => {
    const {height, width} = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
  }

  componentDidMount() {
    this.updateDimensions()
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  // stop updating state after unmount
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateDimensions);
  }

  render() {
    const sideMargin = 20
    return (
      <View style={{flex: 1}}>
        <SearchField listRef={this.refs.listRef}/>
        {!this.props.ready && <AppLoading/>}
        {this.props.querySuccess && this.props.ready &&
          <FlatList
            ref='listRef' // for setting list to top on new queries
            data={this.props.resultList}
            keyExtractor={() => Math.random().toString(36).substr(2, 9)}
            renderItem={({item}) => {
              if (item.logo) {
                return (
                  <View style={styles.logoView}>
                    <Text>Images Provided By</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://pixabay.com/')}>
                      <Image source={{uri: 'https://pixabay.com/static/img/logo.png'}}
                        style={styles.imageDimensions} />
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
                    resolution={item.recordedWidth.toString() + ' x ' + item.recordedHeight.toString()}/>
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

const styles = StyleSheet.create({
  logoView: {
    alignItems: 'center',
    marginTop: 3,
  },
  imageDimensions: {
    width: 160,
    height: 31,
  }
})

function mapStateToProps(state) {
  return {
    showingResults: state.showingResults,
    resultList: state.resultList,
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    querySuccess: state.querySuccess,
    ready: state.ready,
  }
}

export default connect(mapStateToProps)(SearchPage)
