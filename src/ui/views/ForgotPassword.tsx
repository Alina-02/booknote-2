// src/components/ForgotPassword.jsx
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { FirebaseAuth } from '../../infrastructure/config';
import { useNavigate } from 'react-router-dom';

// Define a validation schema using Yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setMessage('');
      setError('');

      try {
        await sendPasswordResetEmail(FirebaseAuth, values.email);
        setMessage(
          'A password reset link has been sent to your email address.'
        );
      } catch (err) {
        // Clear message on error
        setMessage('');

        const errorCode = err.code;

        switch (errorCode) {
          case 'auth/user-not-found':
            setError('The email address you entered is not registered.');
            break;
          case 'auth/invalid-email':
            setError('The email address format is invalid.');
            break;
          default:
            setError('Failed to send password reset email. Please try again.');
            console.error(err);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const goToLogIn = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        spacing={2.5}
        width="370px"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Your Password?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Enter your email to receive a password reset link.
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            margin="normal"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || !formik.isValid}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Password Reset'}
          </Button>
        </Box>

        {message && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        <Typography
          variant="body1"
          onClick={goToLogIn}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Return to LogIn
        </Typography>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
