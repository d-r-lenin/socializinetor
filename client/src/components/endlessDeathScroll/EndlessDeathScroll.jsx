import React from 'react'

import StoriesTray from '../storiesTray/StoriesTray'
import MediaCard from '../mediaCard/MediaCard'

function EndlessDeathScroll() {
  return (
    <div>
        <div>
            <StoriesTray/>
        </div>
        <div>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            <MediaCard/>
            
        </div>
    </div>
  )
}

export default EndlessDeathScroll