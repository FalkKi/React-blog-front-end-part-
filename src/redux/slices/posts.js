import { createSlice } from "@reduxjs/toolkit";
import { fetchTags } from "../../requests/postRequests.js";
import { fetchPosts } from '../../requests/postRequests';
import { fetchRemovePost } from '../../requests/postRequests';

const initialState = {
   posts: {
      items: [],
      status: 'loading',
   },
   tags: {
      items: [],
      status: 'loading',
   },
};

const postSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
   },
   extraReducers: {
      //получение статей
      [fetchPosts.pending]: (state) => { //extraReducers для отлавливания состояния pending, loaded в редакс вкладке браузера
         state.posts.items = [];
         state.posts.status = 'loading';
      },
      [fetchPosts.fulfilled]: (state, action) => {
         state.posts.items = action.payload
         state.posts.status = 'loaded';
      },
      [fetchPosts.rejected]: (state, action) => {
         state.posts.items = [];
         state.posts.items = action.payload
         state.posts.status = 'error';
      },
      //получение тегов
      [fetchTags.pending]: (state) => { //extraReducers для отлавливания состояния pending, loaded в редакс вкладке браузера
         state.tags.items = [];
         state.tags.status = 'loading';
      },
      [fetchTags.fulfilled]: (state, action) => {
         state.tags.items = action.payload
         state.tags.status = 'loaded';
      },
      [fetchTags.rejected]: (state, action) => {
         state.tags.items = [];
         state.tags.items = action.payload
         state.tags.status = 'error';
      },
      //удаление статей
      [fetchRemovePost.pending]: (state, action) => {
         console.log(action);
         state.posts.items = state.posts.items.filter(title => title._id !== action.meta.arg);
         state.tags.status = 'loading';
      },
   },
});

export const postReducer = postSlice.reducer;