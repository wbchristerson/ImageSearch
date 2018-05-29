import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { scaleImageHeight } from '../utils/helper'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

class DetailPage extends Component {
  render() {
    // FlatList used to save memory for recycled views
    // <View style={{flex: 1, backgroundColor: '#23d4b1', height: 300, width: 300}}>
    // </View>
    var {height, width} = Dimensions.get('window')
    console.log('Height: ', height)
    console.log('Width: ', width)
    // style={{width: this.props.currentWidth,
    //         height: this.props.currentHeight}}

    // contentContainerStyle={{alignItems: 'center'}}

    return (
      <ScrollView>
        <Image
          source={{uri: this.props.currentSource}}
          style={{width: width, height: scaleImageHeight(width, this.props.currentWidth, this.props.currentHeight)}}/>
        <View style={{padding: 10}}>
          <Text style={{flex: 1, fontSize: 24, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
            User: {this.props.currentUser}
          </Text>
          <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
            Resolution: {this.props.currentResolution}
          </Text>
          <Text style={{flex: 1, backgroundColor: '#23d4b1', alignItems: 'center', justifyContent: 'center'}}>
            Tags: {this.props.currentTags}
          </Text>
        </View>
      </ScrollView>
    )
  }
  // <View style={{padding: 10}}>
  // </View>
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentTags: state.currentTags,
    currentResolution: state.currentResolution,
    currentSource: state.currentSource,
    currentWidth: state.currentWidth,
    currentHeight: state.currentHeight,
  }
}

export default connect(mapStateToProps)(DetailPage)
