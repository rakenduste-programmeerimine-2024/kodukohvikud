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
import { supabase } from '../../../supabase/supabaseClient'; // Import Supabase client

const SignUpContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: '',
  height: '100vh',
  padding: theme.spacing(2),
}));

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic form validation
    let valid = true;
    if (!name) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (!valid) return;

    // Supabase sign-up logic
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // Save user's name in the profile metadata
      },
    });

    if (error) {
      console.error('Error signing up:', error.message);
      alert('Sign-up failed: ' + error.message);
    } else {
      console.log('Sign-up successful:', data);
      alert('Sign-up successful! Please check your email for a confirmation link.');
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'absolute', top: '10px', right: '10px' }} />
      <SignUpContainer>
        <Typography component="h1" variant="h4" gutterBottom sx={{ color: '#0A0B56' }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} sx={{ width: '100%', maxWidth: '400px' }}>
          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <TextField
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              placeholder="John Doe"
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              placeholder="johndoe@example.com"
              error={emailError}
              helperText={emailError ? 'Please enter a valid email address' : ''}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
