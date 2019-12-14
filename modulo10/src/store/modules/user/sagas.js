import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '~/services/api';
import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, email, avatar_id, ...rest} = payload.data;
    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Perfil aualizado com sucesso');
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert(
      'Erro na atualização',
      'Houve um erro na atualização, verifique seus dados',
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
