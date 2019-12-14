import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { signInSucess, signFailure } from './actions';
import history from '~/services/history';
import api from '~/services/api';

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });
    const { token, user } = response.data;
    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviço',
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    //yield delay(3000);

    yield put(signInSucess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Erro no login',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export function* singUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', { name, email, password });
    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Erro no cadastro',
      'Houve um erro no cadastro, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  console.tron.log(`setToken()`, payload);
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_UP_REQUEST', singUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
