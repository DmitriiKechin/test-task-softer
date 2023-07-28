import React, { FC, useRef } from 'react';
import { LoadingFormProps } from './loadingForm.types';
import { Button, Link, Paper, TextField } from '@mui/material';

export const LoadingForm: FC<LoadingFormProps> = ({
  setToken,
  token,
  setFiles,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const changeFilesHandler = () => {
    const files = fileRef.current?.files;
    if (files && files.length > 0) {
      setFiles([...Array.from(files)]);
    } else {
      setFiles(null);
    }
  };

  return (
    <Paper
      component="form"
      elevation={5}
      sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      <TextField
        fullWidth
        label="Token"
        value={token}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setToken(event.target.value);
        }}
      />
      <input
        style={{ position: 'fixed', zIndex: '-1', opacity: '0' }}
        ref={fileRef}
        type="file"
        multiple
        onChange={changeFilesHandler}
      />
      <Link
        href="https://yandex.ru/dev/disk/poligon/"
        target="_blank"
        rel="noreferrer"
      >
        Получить токен
      </Link>
      <Button
        variant="contained"
        onClick={(event) => {
          event.preventDefault();
          if (fileRef.current) {
            fileRef.current.click();
          }
        }}
      >
        Loading Files
      </Button>
    </Paper>
  );
};
