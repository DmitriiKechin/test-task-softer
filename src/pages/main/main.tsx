import { Alert, Container, Grid } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { LoadingForm } from './modules/loadingForm';
import { UploadFile } from './main.types';
import { LoadingStatus } from './modules/loadingStatus';
import { uploadFile } from './services/uploadFile';

export const MainPage: FC = () => {
  const [token, setToken] = useState('');
  const [files, setFiles] = useState<File[] | null | undefined>();
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const fileCounter = useRef<number>(0);

  //добавляем по одному файлы на отправку, но что бы одновременно отправлялось не более 5 файлов
  useEffect(() => {
    if (!files) {
      return;
    }

    setIsLoading(true);
    if (fileCounter.current > files.length - 1) {
      setFiles(null);
      fileCounter.current = 0;
      return;
    }

    if (uploadFiles.length < 5) {
      uploadFile({
        file: files[fileCounter.current],
        token,
        setUploadFiles,
        errorHandler,
      });
      fileCounter.current++;
    }
  }, [fileCounter, files, token, uploadFiles.length]);

  //убираем состояние загрузки после отправки всех файлов
  useEffect(() => {
    if (uploadFiles.length === 0) {
      setIsLoading(false);
    }
  }, [uploadFiles]);

  // убираем сообщение об ошибке через 5сек
  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  }, [isError]);

  const errorHandler = () => {
    setIsError(true);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Grid container spacing={3} alignItems={'center'}>
        <Grid item xs={12} sm={6}>
          <LoadingForm
            disabled={isLoading}
            token={token}
            setToken={setToken}
            setFiles={setFiles}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoadingStatus uploadFiles={uploadFiles} />
        </Grid>
      </Grid>
      {isError && (
        <Alert
          sx={{
            position: 'absolute',
            top: '0%',
            left: '0',
            width: '100%',
            zIndex: '1000',
          }}
          variant="filled"
          severity="error"
        >
          Ошибка загрузки
        </Alert>
      )}
    </Container>
  );
};
