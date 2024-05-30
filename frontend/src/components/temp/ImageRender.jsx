import React from 'react'

const ImageRender = ({data}) => {
    console.log("🚀 ~ ImageRender ~ data:", data)

    
  return (
    <img src={data?.files[0]?.objectURL} alt='img coming'/>
  )
}

export default ImageRender