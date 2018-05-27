import React, { Component } from 'react'
import SearchField from './SearchField'
import ImageTile from './ImageTile'
import { connect } from 'react-redux'

class SearchPage extends Component {
  render() {
    return(
      <View>
        <SearchField/>
        (this.props.showingResults && )
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    showingResults: state.showingResults
  }
}

export default connect(mapStateToProps)(SearchPage)
