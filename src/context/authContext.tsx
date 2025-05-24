import { createContext, JSX, useEffect, useState } from 'react';
import {
  logoutFirebase,
  onAuthStateHasChanged,
  signInWithCredentials,
} from '../firebase/services';
import { logInWithCredentials } from '../firebase/services';

export interface AuthStateContext {
  userId: string | null;
  status: 'checking' | 'authenticated' | 'no-authenticated';

  handleLoginWithCredentials: (
    password: string,
    email: string
  ) => Promise<void>;

  handleRegisterWithCredentials: (
    password: string,
    email: string
  ) => Promise<void>;
  handleLogOut: () => Promise<void>;
}

const initialState: Pick<AuthStateContext, 'status' | 'userId'> = {
  status: 'checking',
  userId: null,
};

export const AuthContext = createContext({} as AuthStateContext);

interface IElement {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: IElement) => {
  const [session, setSession] = useState(initialState);

  useEffect(() => {
    onAuthStateHasChanged(setSession);
  }, []);

  const handleLogOut = async () => {
    logoutFirebase();
    setSession({ userId: null, status: 'no-authenticated' });
  };

  const validateAuth = (userId: string | undefined) => {
    if (userId) return setSession({ userId, status: 'authenticated' });
    handleLogOut();
  };

  const checking = () =>
    setSession((prev) => ({ ...prev, status: 'checking' }));

  const handleLoginWithCredentials = async (
    email: string,
    password: string
  ) => {
    checking();
    const userId = await logInWithCredentials({ email, password });
    validateAuth(userId);
  };

  const handleRegisterWithCredentials = async (
    email: string,
    password: string
  ) => {
    checking();
    const userId = await signInWithCredentials({ email, password });
    validateAuth(userId);
  };

  return (
    <AuthContext.Provider
      value={{
        ...session,
        handleLoginWithCredentials,
        handleRegisterWithCredentials,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
