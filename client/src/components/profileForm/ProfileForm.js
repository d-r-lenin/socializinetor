import React from 'react'

import profileApi from '../../APIs/profile';

function ProfileForm() {

    async function handleSubmit(e){
        e.preventDefault();
        const form = document.getElementById("profile-form__form");
        const formData = new FormData(form);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        const response = await profileApi.createProfile(formData, config);
        if (response.status === 200) {
            console.log(response.data);
            window.location.href = "/profile";
        }

    }

  return (
      <div className="profile-form">
          <h1 className="profile-form__header">Profile Form</h1>
          <form id="profile-form__form" method="POST" action={profileApi.urls.createProfile()} encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="profile-form__form-group">
                  <label htmlFor="profile-form__name">Name</label>
                  <input type="text" name="name" id="profile-form__name" placeholder="Name" />
              </div>
              <div className="profile-form__form-group">
                  <label htmlFor="profile-form__bio">Bio</label>
                  <textarea name="bio" id="profile-form__bio" placeholder="Bio" />
              </div>
              <div className="profile-form__form-group">
                  <label htmlFor="profile-form__picture">Picture</label>
                  <input type="file" name="display" id="profile-form__picture" />
              </div>
              <div className="profile-form__form-group">
                  <input className="profile-form__submit-btn btn--submit" type="submit" value="Submit" />
              </div>
          </form>
      </div>
  );
}


export default ProfileForm