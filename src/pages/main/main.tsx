import { Button, Container, Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import { LoadingForm } from './components/loadingForm/loadingForm';
import axios from 'axios';

export const MainPage: FC = () => {
  const [token, setToken] = useState('');
  const [files, setFiles] = useState<File[] | null | undefined>();
  const [uploadFiles, setUploadFiles] = useState([]);

  return (
    <Container
      maxWidth="md"
      // sx={{ margin: 'auto', height: 'min(100vh, 500px)' }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LoadingForm token={token} setToken={setToken} setFiles={setFiles} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoadingForm token={token} setToken={setToken} setFiles={setFiles} />
        </Grid>
      </Grid>
    </Container>
  );
};
