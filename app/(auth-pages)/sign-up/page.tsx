"use client"

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
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const SignUpContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(2),
}));

export default function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [open, setOpen] = useState(false); 
  const [message, setMessage] = useState('korras'); 
  const [severity, setSeverity] = useState<'success' | 'error'>('success'); 

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    const birthday = document.getElementById('birthday') as HTMLInputElement;

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
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);

      const firstName = data.get('name');
      const lastName = data.get('last_name');
      const email = data.get('email');
      const phone = data.get('phone');
      const birthday = data.get('birthday');
      const password = data.get('password');

      if (typeof birthday === "string") {
        
        const [day, month, year] = birthday.split("/");
        const formattedBirthday = `${year}-${month}-${day}`;}
      const joinedDate = new Date().toISOString();
     

   
      const { data: insertedData, error } = await supabase
        .from('User') 
        .insert([
          {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone, 
          birth_date: birthday,
          password: password, 
          joined_date: joinedDate,
          },
        ])
        ; 

        if (error) {
          console.error('Error creating user:', error.message);
          setMessage('Registration failed: ' + error.message);
          setSeverity('error');
          setOpen(true);
        } else {
          console.log('User created successfully:', insertedData);
          setMessage('Registration successful!');
          setSeverity('success');
          setOpen(true);
        }
      }
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false); 
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
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <TextField
              id="last_name"
              name="last_name"
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
              error={phoneError}
              helperText={phoneError ? 'Phone number is required' : ''}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="birthday">Birthday</FormLabel>
            <TextField
              id="birthday"
              name="birthday"
              required
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              
              error={birthdayError}
              helperText={birthdayError ? 'Birthday is required' : ''}
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AppTheme>
  );
}
