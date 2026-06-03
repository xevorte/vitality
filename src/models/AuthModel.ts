import {LoginParams, RegisterParams} from './ApiModel';
import StoreModel from './StoreModel';

interface AuthModel extends StoreModel {
  isLogin: boolean;
  token?: string;
  login: (params: LoginParams) => void;
  register: (params: RegisterParams) => void;
  setToken: (token: string) => void;
}

export default AuthModel;
