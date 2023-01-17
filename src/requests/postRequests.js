import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios.js';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
   const { data } = await axios.get('/posts');
   return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
   const { data } = await axios.get('/tags');
   return data;
});

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
   const { data } = await axios.get('/comments');
   return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => await axios.delete(`/posts/${id}`));
