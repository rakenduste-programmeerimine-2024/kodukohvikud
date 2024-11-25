import React from 'react';
import KohvikRegister from '../../components/Kohvik-register/KohvikRegister';
import { Container, CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <React.Fragment>
      {/* CssBaseline provides consistent styling */}
      <CssBaseline />
      
      {/* Main container to center the form on the page */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <KohvikRegister />
      </Container>
    </React.Fragment>
  );
};

export default App;
