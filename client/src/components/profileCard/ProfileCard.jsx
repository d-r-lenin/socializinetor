import React from 'react';

// icon of person with + in frunt of it for add friend
import {
    IoPersonAddOutline
} from 'react-icons/io5';

function ProfileCard() {
  return (
    <div className='profile-card'>
        <div className='profile-card__avatar'>
            <div className='profile-card__avatar-item'>
                <img className='profile-card__image' src='https://picsum.photos/200/200' alt='profile image' />
            </div>
        </div>
        <div className='profile-card__info'>
            <div className='profile-card__info-head'>
                <div className='profile-card__name'>
                    <span className='profile-card__name-item'>username</span>
                </div>
                <div className='profile-card__follow'>
                    <a className='profile-card__follow-btn' href='#'>Follow</a>
                </div>
                <div className='profile-card__message'>
                    <a className='profile-card__message-btn' href='#'>Message</a>
                </div>
                <IoPersonAddOutline className='profile-card__add-friend'/>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard