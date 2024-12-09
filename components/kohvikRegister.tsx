

import React, { useState, useRef } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Autocomplete, LoadScript,useJsApiLoader } from '@react-google-maps/api';
import { createClient } from '@supabase/supabase-js';

// Supabase klient
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const libraries = ['places'];

const KohvikRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    openingHours: '',
    latitude: 0,
    longitude: 0,
  });

  const [menuFile, setMenuFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      setIsValid(Object.values(newData).every((val) => val !== ''));
      return newData;
    });
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();  
        const lng = place.geometry.location.lng();
        setFormData((prev) => ({
          ...prev,
          address: place.formatted_address || '',
          latitude: lat || 0,  
          longitude: lng || 0, 
        }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMenuFile(e.target.files[0]);
    }
  };

  const uploadMenuFile = async (file: File): Promise<string | null> => {
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const { data, error } = await supabase.storage
      .from('cafes_menyy')
      .upload(`menus/${sanitizedFileName}`, file);

    if (error) {
      console.error('Menüü üleslaadimise viga:', error.message);
      return null;
    }

    return data?.path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/cafes_menyy/${data.path}`
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

    const { data, error } = await supabase.from('cafes').insert([{
      nimi: formData.name,
      kirjeldus: formData.description,
      aadress: formData.address,
      email: formData.email,
      telefon: formData.phone,
      menu_fail: menuFileUrl,
      avamis_kuupäev: formData.startDate,
      sulgemis_kuupäev: formData.endDate,
      lahtiolekuaeg: formData.openingHours,
      latitude: formData.latitude,  
      longitude: formData.longitude, 
    }]);

    if (error) {
      console.error('Andmete salvestamine ebaõnnestus:', error);
      alert(`Salvestamine ebaõnnestus: ${error.message || 'Tundmatu viga'}`);
    } else {
      alert('Kohvik edukalt salvestatud!');
      setFormData({
        name: '',
        description: '',
        address: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
        openingHours: '',
        latitude: 0,
        longitude: 0,
      });
      setMenuFile(null);
      setIsValid(false);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} libraries={['places']}>
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 3,
        boxShadow: 6,
        maxWidth: 800,
        margin: 'auto',
        textAlign: 'center',
        color: 'black',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Kohviku registreerimine
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
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

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Väike kirjeldus
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

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Aadress
          </Typography>
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handlePlaceChanged}
              fields={['formatted_address','geometry']}
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

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Avamiskuupäev
          </Typography>
          <TextField
            fullWidth
            type="date"
            variant="outlined"
            size="small"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Sulgemiskuupäev
          </Typography>
          <TextField
            fullWidth
            type="date"
            variant="outlined"
            size="small"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Lahtioleku aeg
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="openingHours"
            placeholder="12.00 - 16.00"
            value={formData.openingHours}
            onChange={handleChange}
            required
          />
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Menüü fail
          </Typography>
          <Button variant="outlined" component="label">
            Lae üles
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Grid>

        {/* Email ja telefon */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Kohviku kontakt
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name="phone"
            placeholder="telefon"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{ mt: 2 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isValid}
            sx={{
              backgroundColor: isValid ? 'green' : 'grey',
              color: isValid ? 'white' : 'black',
              '&:hover': {
                backgroundColor: isValid ? 'darkgreen' : 'grey',
              },
            }}
          >
            Salvesta
          </Button>
        </Grid>
      </Grid>
    </Box>
    </LoadScript>
  );
};

export default KohvikRegister;
