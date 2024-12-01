'use client';

import React, { useState, useRef } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { createClient } from '@supabase/supabase-js';

// Supabase klient
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const KohvikRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    phone: '',
  });

  const [menuFile, setMenuFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Google Maps API laadimine
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      setIsValid(Object.values(newData).every((val) => val.trim() !== ''));
      return newData;
    });
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setFormData((prev) => ({ ...prev, address: place.formatted_address || '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMenuFile(e.target.files[0]);
    }
  };

  const sanitizeFileName = (fileName: string): string => {
    return fileName
      .normalize("NFD") // Normaliseerib täpitähed (nt õ -> o)
      .replace(/[\u0300-\u036f]/g, "") // Eemaldab diakriitikud (nt õ -> o)
      .replace(/[^a-zA-Z0-9._-]/g, "_"); // Asendab kõik keelatud sümbolid alakriipsuga
  };
  

  const uploadMenuFile = async (file: File): Promise<string | null> => {
    const sanitizedFileName = sanitizeFileName(file.name); // Puhastab failinime
  
    const { data, error } = await supabase.storage
      .from('kohvikud_menyy') // Veendu, et bucket nimi on õige
      .upload(`menus/${sanitizedFileName}`, file);
  
    if (error) {
      console.error('Menüü üleslaadimise viga:', error.message);
      return null;
    }
  
    return data?.path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/kohvikud_menyy/${data.path}`
      : null;
  };
  

  const handleSubmit = async () => {
    let menuFileUrl = null;

    if (menuFile) {
      menuFileUrl = await uploadMenuFile(menuFile);
      if (!menuFileUrl) {
        alert('Menüü üleslaadimine ebaõnnestus');
        return;
      }
    }

    const { data, error } = await supabase.from('Kohvikud').insert([
      {
        nimi: formData.name,
        kirjeldus: formData.description,
        aadress: formData.address,
        email: formData.email,
        telefon: formData.phone,
        menu_fail: menuFileUrl,
      },
    ]);

    if (error) {
      console.error('Andmete salvestamine ebaõnnestus:', error.message);
      alert('Salvestamine ebaõnnestus');
    } else {
      alert('Kohvik edukalt salvestatud!');
      setFormData({
        name: '',
        description: '',
        address: '',
        email: '',
        phone: '',
      });
      setMenuFile(null);
      setIsValid(false);
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
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Grid>

        {/* Salvesta nupp */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              onClick={handleSubmit}
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
