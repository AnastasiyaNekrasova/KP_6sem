import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postSlice from './features/post/postSlice'
import commentSlice from './features/comment/commentSlice'
import plantSlice from './features/plant/plantSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        comment: commentSlice,
        plant: plantSlice,
    },
})

