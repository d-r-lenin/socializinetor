import { configureStore } from '@reduxjs/toolkit'

import postReducer from '../slices/posts'
import auth from '../slices/auth'



export default configureStore({
  reducer: {
    post: postReducer,
    auth: auth,
  },
})