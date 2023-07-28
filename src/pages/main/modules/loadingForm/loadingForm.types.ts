export interface LoadingFormProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null | undefined>>;
  disabled: boolean;
}
