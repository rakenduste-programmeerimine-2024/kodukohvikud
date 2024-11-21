// src/components/DateChooser.tsx
import React from 'react';
import { FormControl, FormLabel, TextField, Grid } from '@mui/material';

const DateChooser = () => {
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel htmlFor="dob">Date of Birth</FormLabel>
      <Grid container spacing={2}>
        {/* Day */}
        <Grid item xs={4}>
          <TextField
            id="dob-day"
            label="Day"
            variant="outlined"
            value={day}
            onChange={handleDayChange}
            required
            type="number"
            inputProps={{ min: 1, max: 31 }}
            fullWidth
          />
        </Grid>
        
        {/* Month */}
        <Grid item xs={4}>
          <TextField
            id="dob-month"
            label="Month"
            variant="outlined"
            value={month}
            onChange={handleMonthChange}
            required
            type="number"
            inputProps={{ min: 1, max: 12 }}
            fullWidth
          />
        </Grid>

        {/* Year */}
        <Grid item xs={4}>
          <TextField
            id="dob-year"
            label="Year"
            variant="outlined"
            value={year}
            onChange={handleYearChange}
            required
            type="number"
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
            fullWidth
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default DateChooser;
