'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const KohvikRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    phone: '',
  });

  const [isValid, setIsValid] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Google Maps API laadimine
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],  // Veendu, et places on lisatud
  });

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

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setFormData((prev) => ({ ...prev, address: place.formatted_address || '' }));
    }
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
        {/* Kohviku nimi */}
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
          />
        </Grid>

        {/* Kohviku kirjeldus */}
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
          />
        </Grid>

        {/* Aadressi auto-completion */}
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Kohviku aadress
          </Typography>
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handlePlaceChanged}
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Autocomplete>
          )}
        </Grid>

        {/* Email ja telefon */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Kohviku kontakt
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{ mt: 2 }}
          />
        </Grid>

        {/* Menüü laadimine */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom sx={{ color: '#555' }}>
            Lisa kohviku menüü
          </Typography>
          <Button variant="outlined" component="label" sx={{ display: 'block', mb: 2, padding: '8px 16px' }}>
            Lae üles
            <input type="file" hidden />
          </Button>
        </Grid>

        {/* Salvesta nupp */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              sx={{
                minWidth: 200,
                backgroundColor: isValid ? 'green' : 'primary.main',
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
