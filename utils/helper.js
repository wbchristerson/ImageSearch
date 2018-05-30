// Given an entry of the resulting query, format the relevant information into
// a single object
export function scrapeData(obj) {
  return {
    logo: false, // indicates whether item represents Pixabay logo or an actual image
    comments: obj.comments,
    previewURL: obj.previewURL,
    previewWidth: obj.previewWidth,
    previewHeight: obj.previewHeight,
    webformatURL: obj.webformatURL,
    webformatWidth: obj.webformatWidth,
    webformatHeight: obj.webformatHeight,
    user: obj.user,
    userImageURL: obj.userImageURL,
    tags: obj.tags,
    recordedWidth: obj.hasOwnProperty('imageWidth') ? obj.imageWidth : obj.webformatWidth,
    recordedHeight: obj.hasOwnProperty('imageHeight') ? obj.imageHeight : obj.webformatHeight,
  }
}


// re-calculate length for image based on measuredWidth parameter
export function scaleLength(measuredWidth, oldWidth, oldHeight) {
  return ((measuredWidth * oldHeight) / oldWidth)
}

// re-size image's height to match screen width
export function scaleImageHeight(screenWidth, oldWidth, oldHeight) {
  return ((oldHeight * screenWidth) / oldWidth)
}

// split string of tags into list of
export function splitTags(tagString) {
  arr = tagString.split(',')
  if (arr.length == 1) {
    arr = tagString.split(' ')
  }
  for (let i = 0; i < arr.length; i++) {
    if ((arr[i].length > 0) && (arr[i].charAt(0) == ' ')) {
      arr[i] = arr[i].slice(1)
    }
    if ((arr[i].length > 0) && (arr[i].charAt(arr[i].length - 1) == ' ')) {
      arr[i] = arr[i].slice(0,-1)
    }
  }
  newArr = arr.join(' #')
  if (newArr.length > 0) {
    newArr = '#' + newArr
  }
  return newArr
}
