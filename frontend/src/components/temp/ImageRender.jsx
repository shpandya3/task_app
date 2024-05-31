import React from 'react'

const ImageRender = ({data}) => {
    
  return (
    <img src={`${atob(data)}`} alt='img coming'/>
  )
}

export default ImageRender