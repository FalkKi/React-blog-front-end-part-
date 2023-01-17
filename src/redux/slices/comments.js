import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from './../../requests/postRequests';



const initialState = {
   comments: {
      items: [],
      status: 'loading',
   },
};

const commentsSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {},
   extraReducers: {
      [fetchComments.pending]: (state) => { //extraReducers для отлавливания состояния pending, loaded в редакс вкладке браузера
         state.comments.items = [];
         state.comments.status = 'loading';
      },
      [fetchComments.fulfilled]: (state, action) => {
         state.comments.items = action.payload
         state.comments.status = 'loaded';
      },
      [fetchComments.rejected]: (state, action) => {
         state.comments.items = [];
         state.comments.items = action.payload
         state.comments.status = 'error';
      },
   }
});

export const commentsReducer = commentsSlice.reducer