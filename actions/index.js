export const GO_TO_IMAGE = 'GO_TO_IMAGE'
export const GET_IMAGE_LIST = 'GET_IMAGE_LIST'
export const SHOW_RESULTS = 'SHOW_RESULTS'
export const SET_QUERY = 'SET_QUERY'

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
  fetch(`https://pixabay.com/api/?key=9114112-442af9a3d14656a357dba0fe7&q=${query}&image_type=photo&per_page=100`)
  .then(data => data.json())
  .then(data => dispatch(getImageList(data)))
);
