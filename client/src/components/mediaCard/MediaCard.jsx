import React from 'react';

import './MediaCard.scss';

import { 
    IoEllipsisHorizontal,
    IoHeartOutline,
    // IoHeartSharp,
    IoChatbubbleOutline,
    // IoChatbubbleSharp,
    IoPaperPlaneOutline,
    // IoPaperPlaneSharp,
    IoBookmarkOutline,
    // IoBookmarkSharp,
} from 'react-icons/io5'; 

function MediaCard() {
  return (
    <div className="card">
        <div className="card__header">
            <div className='card__profile' >
                <img className='card__profile-pic' src="https://picsum.photos/100/100" alt="random" />
            </div>
            <div className='card__username-holder'>
                <div className='card__username'>Username</div>
                <div className='card__posted-time'> 
                    <span className='dot'>&#8226;</span>
                    12/12/2020
                </div>
            </div>

            <div className='card__options'>
                <div className='card__options-icon'>
                    <IoEllipsisHorizontal />
                </div>
            </div>
        </div>

        <div className="card__body">
            <div className='card__body-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae. Quisquam, quae. Quisquam, quae. Quisquam, quae.
            </div>
            <img className='card__body-pic' src="https://picsum.photos/500/300" alt="random" />
        </div>

        <div className="card__footer">
            <div className='card__interaction-tray'>
                <div className='card__like-btn card__interaction-icon'>
                    <IoHeartOutline />
                </div>
                <div className='card__comment-btn card__interaction-icon'>
                    <IoChatbubbleOutline />
                </div>
                <div className='card__share-btn card__interaction-icon'>
                    <IoPaperPlaneOutline />
                </div>
            </div>
            <div className='card__save-btn card__interaction-icon'>
                <IoBookmarkOutline />
            </div>
        </div>
    </div>
  )
}

export default MediaCard