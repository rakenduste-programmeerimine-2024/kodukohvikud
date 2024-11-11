'use client';

import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const KohvikRegister: React.FC = () => {
  // State to track form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    phone: '',
  });

  // State to track if the form is valid
  const [isValid, setIsValid] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Check if all fields are filled
      setIsValid(
        Object.values(newData).every((val) => val.trim() !== '') // ensure no empty fields
      );
      return newData;
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 3,
        boxShadow: 6,
        maxWidth: 800,
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
        Kohviku registreerimine
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Kohviku nimi
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{
              borderRadius: 2,
              borderColor: 'transparent',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50', // Focus state color
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Kohviku väike kirjeldus
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            sx={{
              borderRadius: 2,
              borderColor: 'transparent',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50', // Focus state color
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Kohviku aadress
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            sx={{
              borderRadius: 2,
              borderColor: 'transparent',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50', // Focus state color
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Kohviku kontakt
          </Typography>
          <Typography variant="body2" color="black">Email</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              borderRadius: 2,
              borderColor: 'transparent',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50', // Focus state color
                },
              },
            }}
          />
          <Typography variant="body2" mt={2} color="black">Tel. nr</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{
              borderRadius: 2,
              borderColor: 'transparent',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50', // Focus state color
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Lisa kohviku menüü
          </Typography>
          <Button variant="outlined" component="label" sx={{ display: 'block', mt: 3.5}}>
            Lae üles
            <input type="file" hidden />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              sx={{
                minWidth: 200,
                backgroundColor: isValid ? 'green !important' : 'primary.main', 
                color: 'white !important',
                '&:hover': {
                  backgroundColor: isValid ? '#388e3c !important' : 'primary.dark !important',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'grey !important',
                },
              }}
              size="large"
              disabled={!isValid} 
            >
              SALVESTA
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KohvikRegister;
