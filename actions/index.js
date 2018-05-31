export const GO_TO_IMAGE = 'GO_TO_IMAGE'
export const GET_IMAGE_LIST = 'GET_IMAGE_LIST'
export const SHOW_RESULTS = 'SHOW_RESULTS'
export const SET_QUERY = 'SET_QUERY'
export const SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE'
export const SET_DIMENSIONS = 'SET_DIMENSIONS'
export const SET_ERROR = 'SET_ERROR'
export const SET_READY = 'SET_READY'

export function goToImage(clickedImage) {
  return {
    type: GO_TO_IMAGE,
    clickedImage,
  }
}

export function getImageList(data) {
  return {
    type: GET_IMAGE_LIST,
    data,
  }
}

export function showResults(status) {
  return {
    type: SHOW_RESULTS,
    status,
  }
}

export function setQuery(query) {
  return {
    type: SET_QUERY,
    query,
  }
}

export const getResults = (query) => dispatch => (
  fetch(`https://pixabay.com/api/?key=9114112-442af9a3d14656a357dba0fe7&q=${query}&image_type=photo&per_page=100&safesearch=true`)
  .then(data => data.json())
  .then(data => dispatch(getImageList(data)))
  .then(() => dispatch(setReady(true)))
  .catch(() => dispatch(setError()))
)

export function setReady(status) {
  return {
    type: SET_READY,
    status,
  }
}

// signal that querySuccess should be set to false
export function setError() {
  return {
    type: SET_ERROR,
  }
}

export function setCurrentImage(user, tags, resolution, source, width, height) {
  return {
    type: SET_CURRENT_IMAGE,
    user,
    tags,
    resolution,
    source,
    width,
    height,
  }
}

// set recorded screen dimensions, for keeping track of whether the device is in
// portrait or landscape orientation
export function setDimensions(newWidth, newHeight) {
  return {
    type: SET_DIMENSIONS,
    newWidth,
    newHeight,
  }
}
