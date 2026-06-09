import { UserLoginRequest, UserRegisterRequest } from 'api/generated/models/vitality';
import { loginUsersLoginPost, registerUsersRegisterPost } from 'api/generated/services/vitality/users/users';
import { produce } from 'immer';
import AuthModel from 'models/AuthModel';
import ApiServices from 'services/ApiServices';
import LoadingHelper from 'services/LoadingHelper';
import { useSessionStore } from 'stores/session/SessionStore';

const AuthAction = (
  set: (newState: AuthModel | ((prevState: AuthModel) => AuthModel)) => void,
) => {
  const actions = {
    login: async (params: UserLoginRequest) => {
      try {
        LoadingHelper.show();

        const res: any = await loginUsersLoginPost(params);

        if (res?.ok) {
          console.log(res);
          const { setProfile } = useSessionStore.getState();

          ApiServices.setHeaders({
            Authorization: `Bearer ${res?.data?.data?.session_token || ''}`,
          });

          actions.setRefreshToken(res?.data?.data?.session_token || '');
          actions.setToken(res?.data?.data?.session_token || '');
          actions.setIsLogin(true);
          setProfile(res?.data?.data?.user);

          return res;
        }

        throw res;
      } catch (error) {
        console.tron.error(error);
        return error;
      } finally {
        LoadingHelper.hide();
      }
    },
    register: async (params: UserRegisterRequest) => {
      try {
        LoadingHelper.show();

        const res = await registerUsersRegisterPost(params);

        if (res?.ok) {
          return res;
        }

        throw res;
      } catch (error) {
        console.tron.error(error);
        return error;
      } finally {
        LoadingHelper.hide();
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
    resetRegisterData: () => {
      set(
        produce((state: AuthModel) => {
          state.registerData = {
            name: "",
            username: "",
            password: "",
            height_cm: NaN,
            weight_kg: NaN,
            age: NaN,
          };
        }),
      );
    },
    logout: () => {
      set(
        produce((state: AuthModel) => {
          state.token = undefined;
          state.refreshToken = undefined;
          state.isLogin = false;
        }),
      );
    },
  };

  return actions;
};

export default AuthAction;
