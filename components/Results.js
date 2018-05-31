import React, { Component } from 'react'
import ImageTile from './ImageTile'
import Logo from './Logo'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import { scaleLength } from '../utils/helper'

class Results extends Component {
  render() {
    const sideMargin = 20
    return (
      <FlatList
        ref='listRef' // for setting list to top on new queries
        data={this.props.resultList}
        keyExtractor={() => Math.random().toString(36).substr(2, 9)}
        renderItem={({item}) => {
          if (item.logo) {
            return <Logo/>
          } else {
            return (
              <ImageTile
                source={item.webformatURL}
                sourceWidth={item.webformatWidth}
                sourceHeight={item.webformatHeight}
                width={Math.min(this.props.screenWidth,
                  this.props.screenHeight) - 2 * sideMargin}
                height={scaleLength(Math.min(this.props.screenWidth,
                  this.props.screenHeight) - 2 * sideMargin,
                  item.webformatWidth, item.webformatHeight)}
                objRef={this.props.objRef}
                user={item.user}
                tags={item.tags}
                resolution={item.recordedWidth.toString() + ' x ' +
                  item.recordedHeight.toString()}/>
            )
          }
        }
      }/>
    )
  }
}

function mapStateToProps(state) {
  return {
    resultList: state.resultList,
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
  }
}

export default connect(mapStateToProps)(Results)
