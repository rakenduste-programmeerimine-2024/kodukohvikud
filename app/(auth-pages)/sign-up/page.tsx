'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AppTheme from '../../../shared-theme/AppTheme';
import ColorModeSelect from '../../../shared-theme/ColorModeSelect';


const SignUpContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: '',
  height: '100vh',
  padding: theme.spacing(2),
}));

export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      console.log({
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
      });
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'absolute', top: '10px', right: '10px' }} />
      <SignUpContainer>
        <Typography component="h1" variant="h4" gutterBottom>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
          
          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="name">First Name</FormLabel>
            <TextField
              id="name"
              name="name"
              required
              variant="outlined"
              placeholder="Margus"
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="name">Last Name</FormLabel>
            <TextField
              id="last name"
              name="last name"
              required
              variant="outlined"
              placeholder="Murakas"
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              name="email"
              required
              variant="outlined"
              placeholder="MargusMurakas@example.com"
              error={emailError}
              helperText={emailError ? 'Please enter a valid email address' : ''}
            />
          </FormControl>

          
          <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <TextField
                id="phone"
                name="phone"
                required
                variant="outlined"
                placeholder="900-2002"
                type="tel"
                error={nameError}
                helperText={nameError ? 'Phone number is required' : ''}
                inputProps={{
                  pattern: '[0-9]*', 
                  
                  inputMode: 'numeric',
                }}
                onInput={(e) => {
                  
                  const input = e.target as HTMLInputElement;
                  
                  input.value = input.value.replace(/\D/g, '');
                }}
              />
            </FormControl>


          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="birthday">Birthday</FormLabel>
            <TextField
              id="birthday"
              name="birthday"
              required
              variant="outlined"
              type='date'
              InputLabelProps={{
                shrink: true, 
              }}
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
            />
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              required
              variant="outlined"
              placeholder="••••••"
              error={passwordError}
              helperText={passwordError ? 'Password must be at least 6 characters' : ''}
            />
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>
            Sign up
          </Button>
        </Box>
      </SignUpContainer>
    </AppTheme>
  );
}
