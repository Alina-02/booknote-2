import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

interface PropsRegister {
  email: string;
  password: string;
}

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
