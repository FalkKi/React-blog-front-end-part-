import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios.js';

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
   const { data } = await axios.post('/auth/login', params);
   console.log('authdata', data)  //сюда пишем такой путь, какой указал на бэкенде
   return data;
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
   const { data } = await axios.get('/auth/me'); // параметр здесь не нужен, мы его берем из локалсторэдж
   return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
   console.log(params)
   const { data } = await axios.post('/auth/register', params);
   return data;
});