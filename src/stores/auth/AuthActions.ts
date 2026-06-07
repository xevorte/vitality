import { UserLoginRequest, UserRegisterRequest } from 'api/generated/models/vitality';
import { loginUser, registerUser } from 'api/generated/services/vitality/users/users';
import { produce } from 'immer';
import AuthModel from 'models/AuthModel';
import ApiServices from 'services/ApiServices';
import LoadingHelper from 'services/LoadingHelper';

const AuthAction = (
  set: (newState: AuthModel | ((prevState: AuthModel) => AuthModel)) => void,
) => {
  const actions = {
    login: async (params: UserLoginRequest) => {
      try {
        LoadingHelper.show();

        const res = await loginUser(params);

        if (res?.ok) {
          ApiServices.setHeaders({
            Authorization: `Bearer ${res?.data?.access_token || ''}`,
          });

          actions.setRefreshToken(res?.data?.refresh_token || '');
          actions.setToken(res?.data?.access_token || '');
          actions.setIsLogin(true);

          return res;
        } else {
          throw res;
        }
      } catch (error) {
        console.tron.error(error);
      }
    },
    register: async (params: UserRegisterRequest) => {
      try {
        LoadingHelper.show();

        const res = await registerUser(params);

        if (res?.ok) {
          actions.setRegisterData({
            name: "",
            username: "",
            password: "",
            height_cm: NaN,
            weight_kg: NaN,
            age: NaN,
          });

          return res;
        } else {
          throw res;
        }
      } catch (error) {
        console.tron.error(error);
      }
    },
    setIsLogin: (isLogin: boolean) => {
      set(
        produce((state: AuthModel) => {
          state.isLogin = isLogin;
        }),
      );
    },
    setToken: (token: string) => {
      set(
        produce((state: AuthModel) => {
          state.token = token;
        }),
      );
    },
    setRefreshToken: (refreshToken: string) => {
      set(
        produce((state: AuthModel) => {
          state.refreshToken = refreshToken;
        }),
      );
    },
    setRegisterData: (registerData: UserRegisterRequest) => {
      set(
        produce((state: AuthModel) => {
          state.registerData = registerData;
        }),
      );
    },
  };

  return actions;
};

export default AuthAction;
