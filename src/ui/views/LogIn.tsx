import React, { useContext } from 'react';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const logInValidationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const LogIn = () => {
  const navigate = useNavigate();
  const { handleLoginWithCredentials, status } = useContext(AuthContext);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: logInValidationSchema,
    onSubmit: async (values, { setFieldError }) => {
      const correctLogIn = await handleLoginWithCredentials(
        values.email,
        values.password
      );
      if (correctLogIn) {
        goToMain();
      } else {
        setFieldError('email', 'Invalid credentials');
        setFieldError('password', 'Invalid credentials');
      }
    },
  });

  const goToMain = () => {
    navigate('/main');
  };

  const goToCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack height="100%" display="flex" alignItems="center">
        <Stack margin={10} alignItems="center">
          <Typography variant="h3" sx={{ height: '55px' }}>
            Save your
          </Typography>
          <Typography variant="h1">BookNotes</Typography>
        </Stack>
        <Stack spacing={2.5} width="370px">
          {formik.errors.email && formik.touched.email && (
            <Alert severity="error">{formik.errors.email}</Alert>
          )}
          <Stack>
            <Typography variant="body1" fontWeight="600" ml={1}>
              Email
            </Typography>
            <TextField
              title="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Stack>
          <Stack alignItems="start">
            <Typography variant="body1" fontWeight="600" ml={1}>
              Password
            </Typography>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              title="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    sx={{ padding: '1rem' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color="error" variant="caption">
                {formik.errors.password}
              </Typography>
            )}
            <Typography variant="body1" ml={1} sx={{ cursor: 'pointer' }}>
              Have you forgotten your password?
            </Typography>
          </Stack>
          <Stack alignItems="center" spacing={0.5}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={formik.isSubmitting}
            >
              Log in
            </Button>
            <Typography
              variant="body1"
              onClick={goToCreateAccount}
              sx={{ cursor: 'pointer' }}
            >
              Create an account
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

export default LogIn;
