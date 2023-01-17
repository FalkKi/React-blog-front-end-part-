import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth} from '../../requests/authRequests';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange"
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log('dispatch', dispatch(fetchAuth(values)))

    if (!data) {
      return alert('Authorization failed');
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
        Enter your account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('password', { required: 'enter password' })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label="Password"
          type="password"
          fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
