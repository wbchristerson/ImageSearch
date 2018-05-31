import { GO_TO_IMAGE, GET_IMAGE_LIST, SET_QUERY,
  SET_CURRENT_IMAGE, SET_DIMENSIONS, SET_ERROR, SET_READY } from '../actions'
import { scrapeData } from '../utils/helper'

const initialState = {
  resultList: [],
  currentQuery: '',
  currentUser: '',
  currentTags: '',
  currentResolution: '',
  currentSource: '',
  screenWidth: 0,
  screenHeight: 0,
  querySuccess: true, // whether the query resulted in a response or failure
  ready: false, // whether the query has returned
}

function screenResult (state = initialState, action) {
  switch (action.type) {
    case GO_TO_IMAGE:
      return {
        ...state,
        ...action.clickedImage,
      }
    case GET_IMAGE_LIST:
      newResultList = [{ logo: true }] // initial entry for logo
      for (let i = 0; i < action.data.hits.length; i++) {
        newResultList.push(scrapeData(action.data.hits[i]))
      }
      return {
        ...state,
        resultList: newResultList,
        querySuccess: true, // query succeeded
      }
    case SET_QUERY:
      return {
        ...state,
        currentQuery: action.query,
      }
    case SET_CURRENT_IMAGE:
      return {
        ...state,
        currentUser: action.user,
        currentTags: action.tags,
        currentResolution: action.resolution,
        currentSource: action.source,
        currentWidth: action.width,
        currentHeight: action.height,
      }
    case SET_DIMENSIONS:
      return {
        ...state,
        screenWidth: action.newWidth,
        screenHeight: action.newHeight,
      }
    case SET_ERROR:
      return {
        ...state,
        querySuccess: false,
      }
    case SET_READY:
      return {
        ...state,
        ready: action.status
      }
    default:
      return state
  }
}

export default screenResult
