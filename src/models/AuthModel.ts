import { UserLoginRequest, UserRegisterRequest } from 'api/generated/models/vitality';
import StoreModel from './StoreModel';

interface AuthModel extends StoreModel {
  isLogin: boolean;
  token?: string;
  refreshToken?: string;
  registerData: UserRegisterRequest;
  login: (params: UserLoginRequest) => void;
  register: (params: UserRegisterRequest) => void;
  setIsLogin: (data: boolean) => void;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setRegisterData: (data: UserRegisterRequest) => void;
  resetRegisterData: () => void;
  logout: () => void;
}

export default AuthModel;
