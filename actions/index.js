export const GO_TO_IMAGE = 'GO_TO_IMAGE'

export function goToImage(clickedImage) {
  return {
    type: GO_TO_IMAGE,
    clickedImage,
  }
}
