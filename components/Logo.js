import React, { Component } from 'react'
import { View, Image, Text, Linking, TouchableOpacity,
  StyleSheet } from 'react-native'

// a stateless component showing the Pixabay logo for attribution
const Logo = () => {
  return (
    <View style={styles.logoView}>
      <Text>Images Provided By</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://pixabay.com/')}>
        <Image source={{uri: 'https://pixabay.com/static/img/logo.png'}}
          style={styles.imageDimensions} />
      </TouchableOpacity>
    </View>
  )
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

export default Logo
