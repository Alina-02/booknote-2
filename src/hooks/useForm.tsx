import { useState } from 'react';

type eventInput = React.ChangeEvent<HTMLInputElement>;

interface Props<T> {
  initialState: T;
}

export const useForm = <T,>({ initialState }: Props<T>) => {
  const [form, setForm] = useState<T>(initialState);
  const [error, setError] = useState<boolean>(false);

  const handleLogInFormChange = (e: eventInput) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return { ...form, form, handleLogInFormChange, error, setError, setForm };
};
