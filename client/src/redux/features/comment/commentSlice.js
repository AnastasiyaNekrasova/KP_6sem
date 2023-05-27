import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ relatedModel, relatedId, comment, uId }) => {
    try {
      const { data } = await axios.post(`/comments/${relatedModel}/${relatedId}`, {
        comment,
        relatedModel,
        relatedId,
        uId
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRelatedModelComments = createAsyncThunk(
  'comment/getRelatedModelComments',
  async ({ relatedModel, relatedId }) => {
    try {
      const { data } = await axios.get(`${relatedModel}/comments/${relatedId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание комментария
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
        // Получение комментов
        [getRelatedModelComments.pending]: (state) => {
            state.loading = true;
        },
        [getRelatedModelComments.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        },
        [getRelatedModelComments.rejected]: (state) => {
            state.loading = false;
        },
    },
})

export default commentSlice.reducer
