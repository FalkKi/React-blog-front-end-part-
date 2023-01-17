import { createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchLogin, fetchRegister } from './../../requests/authRequests';

const initialState = {
   data: null,
   status: 'loading',
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.data = null;   // тут можно мутировать
      }
   },
   extraReducers: {
      [fetchAuth.pending]: (state) => { //extraReducers для отлавливания состояния pending, loaded в редакс вкладке браузера
         state.status = 'loading';
         state.data = null;
      },
      [fetchAuth.fulfilled]: (state, action) => {
         state.status = 'loaded';
         state.data = action.payload;
      },
      [fetchAuth.rejected]: (state, action) => {
         state.status = 'error';
         state.data = null;
      },
      [fetchLogin.pending]: (state) => {
         state.status = 'loading';
         state.data = null;
      },
      [fetchLogin.fulfilled]: (state, action) => {
         state.status = 'loaded';
         state.data = action.payload;
      },
      [fetchLogin.rejected]: (state, action) => {
         state.status = 'error';
         state.data = null;
      },
      [fetchRegister.pending]: (state) => {
         state.status = 'loading';
         state.data = null;
      },
      [fetchRegister.fulfilled]: (state, action) => {
         state.status = 'loaded';
         state.data = action.payload;
      },
      [fetchRegister.rejected]: (state, action) => {
         state.status = 'error';
         state.data = null;
      },
   }
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;