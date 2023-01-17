import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { fetchRegister } from '../../requests/authRequests';

export const Registration = () => {

  const isAuth = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: "onChange"
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(values);

    if (!data.payload) {
      return alert('Registration failed');
    };

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    };
  };

  if (isAuth) {
    navigate('/');
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'enter full name' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', { required: 'enter email' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', { required: 'enter password' })}
          fullWidth
        />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Push to register
        </Button>
      </form>
    </Paper>
  );
};
