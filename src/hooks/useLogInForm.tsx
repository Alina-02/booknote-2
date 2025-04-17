import { useState } from 'react';

type eventInput = React.ChangeEvent<HTMLInputElement>;

interface Props<T> {
  initialState: T;
}

export const useLogInForm = <T,>({ initialState }: Props<T>) => {
  const [logInForm, setLogInForm] = useState<T>(initialState);

  const handleLogInFormChange = (e: eventInput) => {
    setLogInForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return { ...logInForm, logInForm, handleLogInFormChange };
};
