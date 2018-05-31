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


// create a list of offsets of images from the beginning of the flatlist for
// portrait view
export function createPortraitOffsets(mWidth, mHeight, resultList) {
  console.log('ResultList: ', resultList)
  let portraitArr = [0]
  let width = mWidth
  let height = mHeight
  if (width > height) {
    let temp = width
    width = height
    height = temp
  }
  let newHeight
  for (let i = 1; i < resultList.length; i++) {
    newHeight = scaleLength(width - 40, resultList[i].webformatWidth,
      resultList[i].webformatHeight)
    portraitArr.push(newHeight + 40)
  }
  return portraitArr
}

// create a list of offsets of images from the beginning of the flatlist for
// landscape view
export function createLandscapeOffsets(mWidth, mHeight, resultList) {
  let landscapeArr = [0]
  let width = mWidth
  let height = mHeight
  if (width > height) {
    let temp = width
    width = height
    height = temp
  }
  let newHeight
  for (let i = 1; i < resultList.length; i++) {
    newHeight = scaleLength(height - 80, resultList[i].webformatWidth,
      resultList[i].webformatHeight)
    landscapeArr.push(newHeight + 40)
  }
  return landscapeArr
}

// return the largest index i of the array arr such that arr[i] <= height; it is
// assumed that height is nonnegative and that all entries of arr are
// nonnegative with the first entry being 0; furthermore, arr is expected to
// have at most 100 entries, so there is no need to worry about integer wrapping
// (to negative numbers) when finding a middle index, i.e. we can just use the
// average
export function binarySearch(height, arr) {
  let lo = 0
  let hi = arr.length - 1
  let mid
  if (height >= arr[arr.length - 1]) {
    return arr.length - 1
  }
  while ((hi - lo) >= 2) {
    mid = Math.floor((lo + hi) / 2) // no wrapping
    if (height < arr[mid]) {
      hi = mid
    } else {
      lo = mid
    }
  }
  if (((lo + 1) < arr.length) && (arr[lo+1] <= height)) {
    return lo+1
  } else {
    return lo
  }
}
