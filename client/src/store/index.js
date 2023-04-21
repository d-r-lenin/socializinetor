import { configureStore } from '@reduxjs/toolkit'

import postReducer from '../slices/posts'



export default configureStore({
  reducer: {
    post: postReducer,
  },
})