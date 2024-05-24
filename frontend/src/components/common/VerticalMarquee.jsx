import React, { useState } from 'react'
import './VerticalMarquee.css' // Import CSS file for styling

const VerticalMarquee = (props) => {
  const [isPaused, setIsPaused] = useState(false)

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <div
      className="marquee"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      
    >
      <div className={`marquee-content ${isPaused ? 'paused' : ''}`}>
        {props.children}
      </div>
    </div>
  )
}

export default VerticalMarquee
