import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

interface PropsRegister {
  email: string;
  password: string;
}

type StateDispatch = any;

export const onAuthStateHasChanged = (setSession: StateDispatch) => {
  onAuthStateChanged(FirebaseAuth, (user) => {
    if (!user) return setSession({ status: 'no-authenticated', userId: null });
    setSession({ status: 'authenticated', userId: user!.uid });
  });
};

export const signInWithCredentials = async (props: PropsRegister) => {
  const { email, password } = props;

  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return resp.user.uid;
  } catch (e) {
    alert((e as Error).message);
  }
};

export const logInWithCredentials = async (props: PropsRegister) => {
  const { email, password } = props;
  console.log(email);
  console.log(password);
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return resp.user.uid;
  } catch (e) {
    alert((e as Error).message);
  }
};

export const logoutFirebase = async () => await FirebaseAuth.signOut();
