import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { AuthContext } from '../../context/authContext';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { handleRegisterWithCredentials } = useContext(AuthContext);

  const { handleLogInFormChange, password, email } = useForm({
    initialState: {
      password: '',
      email: '',
    },
  });

  const handleCreateAccount = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleRegisterWithCredentials(email, password);
    goToLogIn();
  };

  const goToLogIn = () => {
    navigate('/');
  };

  return (
    <Stack height="100%" display="flex" alignItems="center">
      <Stack margin={10} alignItems="center">
        <Typography variant="h3" sx={{ height: '55px' }}>
          Save your
        </Typography>
        <Typography variant="h1">BookNotes</Typography>
      </Stack>
      <Stack spacing={3} width="370px">
        <Stack>
          <Typography variant="body1" fontWeight="600" ml={1}>
            Email
          </Typography>
          <TextField
            title="Email"
            name="email"
            onChange={handleLogInFormChange}
            value={email}
            fullWidth
          />
        </Stack>
        <Stack alignItems="start">
          <Typography variant="body1" fontWeight="600" ml={1}>
            Password
          </Typography>
          <TextField
            type="password"
            title="Password"
            name="password"
            onChange={handleLogInFormChange}
            value={password}
            fullWidth
          />
        </Stack>
        <Stack alignItems="center" spacing={0.5}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleCreateAccount}
            fullWidth
          >
            Create account
          </Button>
          <Typography
            variant="body1"
            onClick={goToLogIn}
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Return to LogIn
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateAccount;
