import React from 'react'
import { useSelector } from 'react-redux'

import ProfileCard from '../profileCard/ProfileCard'


function ProfilePage() {
  const user = localStorage.user;
  console.log(user)
  return (
    <div className='profile-section'>
        <div className='profile-section__card'>
            <ProfileCard type="mine" username={user } />
        </div>
    </div>
  )
}

export default ProfilePage