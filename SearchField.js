import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { goToImage } from './actions'

class SearchField extends Component {
  state = {
    input: '',
  }

  handleTextChange = (newInput) => {
    this.setState({
      input: newInput
    })
  }

  render() {
    let input = this.state.input
    return(
      <KeyboardAvoidingView behavior='padding'>
        <Text>This is a test.</Text>
        <TextInput
          value={input}
          onChangeText={this.handleTextChange}
          placeholder='Deck Title'
          placeholderTextColor='#3E5982'/>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps (state) {
  return {
    imageId: state.imageId
  }
}

export default connect(mapStateToProps)(SearchField)
