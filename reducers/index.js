import { GO_TO_IMAGE, GET_IMAGE_LIST, SHOW_RESULTS, SET_QUERY,
  SET_CURRENT_IMAGE, SET_DIMENSIONS, SET_ERROR, SET_Y, SET_PORTRAIT_OFFSETS,
  SET_LANDSCAPE_OFFSETS } from '../actions'
import { scrapeData, createPortraitOffsets, createLandscapeOffsets } from '../utils/helper'

const initialState = {
  imageId: -1,
  showingResults: false,
  resultList: [],
  currentQuery: '',
  currentUser: '',
  currentTags: '',
  currentResolution: '',
  currentSource: '',
  screenWidth: 0,
  screenHeight: 0,
  querySuccess: true, // whether the query resulted in a response or failure
  currentY: 0, // screen location/position in search result flatlist
  portraitOffsets: [], // list of image offsets in portrait view
  landscapeOffsets: [], // list of image offsets in landscape view
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
        console.log("Object: ", action.data.hits[i])
        console.log(scrapeData(action.data.hits[i]))
      }
      newPortraitOffsets = createPortraitOffsets(state.screenWidth, state.screenHeight, newResultList)
      newLandscapeOffsets = createLandscapeOffsets(state.screenWidth, state.screenHeight, newResultList)
      return {
        ...state,
        resultList: newResultList,
        querySuccess: true, // query succeeded
        portraitOffsets: newPortraitOffsets,
        landscapeOffsets: newLandscapeOffsets,
      }
    case SHOW_RESULTS:
      return {
        ...state,
        showingResults: action.status
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
    case SET_Y:
      return {
        ...state,
        currentY: action.newY,
      }
    case SET_PORTRAIT_OFFSETS:
      return {
        ...state,
        portraitOffsets: action.portraitOffsets,
      }
    case SET_LANDSCAPE_OFFSETS:
      return {
        ...state,
        landscapeOffsets: action.landscapeOffsets,
      }
    default:
      return state
  }
}

export default screenResult
