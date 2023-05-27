import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    status: null,
    posts: [],
    popularPosts: [],
    userPosts: [],
    loading: false,
}

export const createPost = createAsyncThunk(
    'post/createPost',
    async (params) => {
        try {
            const { data } = await axios.post('/posts', params)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    try {
        const { data } = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getUserPosts = createAsyncThunk('post/getUserPosts', async () => {
    try {
        const { data } = await axios.get('/posts/user/me')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        const { data } = await axios.delete(`/posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (updatedPost) => {
        try {
            const { data } = await axios.put(
                `/posts/${updatedPost.id}`,
                updatedPost,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание поста
        [createPost.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createPost.fulfilled]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state) => {
            state.status = action.payload.message
            state.loading = false
        },
        // Получаение всех постов
        [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false
        },
        // Получаение постов пользователя
        [getUserPosts.pending]: (state) => {
            state.loading = true
        },
        [getUserPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.userPosts = action.payload.userPosts
        },
        [getUserPosts.rejected]: (state) => {
            state.loading = false
        },
        // Удаление поста
        [removePost.pending]: (state) => {
            state.status = null
            state.loading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false
        },
        [removePost.rejected]: (state) => {
            state.status = action.payload.message
            state.loading = false
            state.posts = state.posts.filter(
                (post) => post._id !== action.payload._id
            )
        },
        // Обновление поста
        [updatePost.pending]: (state) => {
            state.loading = true
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id,
            )
            state.posts[index] = action.payload
        },
        [updatePost.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default postSlice.reducer
