import axios from 'axios';
import { UploadFile } from '../main.types';

interface UploadFileOptions {
  file: File;
  token: string;
  setUploadFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  errorHandler: () => void;
}

export const uploadFile = async ({
  file,
  token,
  setUploadFiles,
  errorHandler,
}: UploadFileOptions) => {
  const formData = new FormData();
  formData.set('file', file);

  //добавляем файл в список загружаемых
  setUploadFiles((prev) => {
    const uploadFiles = [...prev];
    uploadFiles.push({
      name: file.name,
      progress: 0,
      id: file.lastModified + file.name,
    });

    return uploadFiles;
  });

  try {
    //получаем ссылку для загрузки файла
    const response = await axios.get(
      'https://cloud-api.yandex.net/v1/disk/resources/upload',
      {
        params: { path: 'disk:/' + file.name },
        headers: {
          Authorization: 'OAuth ' + token,
        },
      }
    );

    if (response.statusText !== 'OK') {
      throw new Error();
    }

    //загружаем файл на яндекс
    const uploadResponse = await axios.put(response.data.href, formData, {
      //отслеживаем прогресс
      onUploadProgress: (progressEvent) => {
        if (!progressEvent.loaded || !progressEvent.total) {
          return;
        }

        const uploadPercentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        setUploadFiles((prev) => {
          const uploadFiles = [...prev];
          const index = uploadFiles.findIndex(
            (uploadFile) => uploadFile.id === file.lastModified + file.name
          );
          uploadFiles[index].progress = uploadPercentage;

          return uploadFiles;
        });
      },
    });

    if (uploadResponse.statusText !== 'Created') {
      throw new Error();
    }
  } catch (err) {
    console.error('Ошибка загрузки');
    errorHandler();
  } finally {
    //удаляем файл из загружаемых
    setUploadFiles((prev) => {
      const uploadFiles = [...prev];
      const index = uploadFiles.findIndex(
        (uploadFile) => uploadFile.id === file.lastModified + file.name
      );
      uploadFiles.splice(index, 1);

      return uploadFiles;
    });
  }
};
