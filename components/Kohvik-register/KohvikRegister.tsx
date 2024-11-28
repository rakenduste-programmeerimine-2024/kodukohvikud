'use client';

import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const KohvikRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    phone: '',
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      setIsValid(
        Object.values(newData).every((val) => val.trim() !== '') 
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
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Lühike kirjeldus kohvikust
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
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
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
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
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
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
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
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#6e7e8d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4caf50',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Lisa kohviku menüü
          </Typography>
          <Button variant="outlined" component="label" sx={{ display: 'block', mb: 2, padding: '8px 16px' }}>
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
                color: isValid ? 'white' : 'black',
                padding: '10px 20px',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: isValid ? '0px 4px 10px rgba(0, 128, 0, 0.3)' : 'none',
                '&:hover': {
                  background: isValid
                    ? 'linear-gradient(135deg, #388e3c, #66bb6a)'
                    : '#d6d6d6',
                },
                '&.Mui-disabled': {
                  background: '#e0e0e0 !important',
                  color: '#9e9e9e !important',
                },
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
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
