import { FC } from 'react';
import { FileUploadProgressCardProps } from './fileUploadProgressCard.types';
import { Box, LinearProgress, Paper, Typography } from '@mui/material';

export const FileUploadProgressCard: FC<FileUploadProgressCardProps> = ({
  name,
  progress,
}) => {
  return (
    <Paper elevation={9} sx={{ p: 2 }}>
      <Typography color="primary" variant="body1" component="p">
        {name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >{`${progress}%`}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
