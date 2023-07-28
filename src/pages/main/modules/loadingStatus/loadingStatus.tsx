import React, { FC, useMemo } from 'react';
import { LoadingStatusProps } from './loadingStatus.types';
import { Paper, Typography } from '@mui/material';
import { FileUploadProgressCard } from './components/fileUploadProgressCard';

export const LoadingStatus: FC<LoadingStatusProps> = ({ uploadFiles }) => {
  const cards = useMemo(() => {
    return uploadFiles.map((file) => (
      <FileUploadProgressCard
        name={file.name}
        progress={file.progress}
        key={file.id}
      />
    ));
  }, [uploadFiles]);
  return (
    <Paper
      elevation={5}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minHeight: '127px',
      }}
    >
      <Typography color="primary" component={'h2'} variant="h5">
        Ход загрузки
      </Typography>
      {cards}
    </Paper>
  );
};
