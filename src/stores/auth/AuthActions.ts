import {produce} from 'immer';
import {LoginParams, RegisterParams} from 'models/ApiModel';
import AuthModel from 'models/AuthModel';

const AuthAction = (
  set: (newState: AuthModel | ((prevState: AuthModel) => AuthModel)) => void,
) => {
  return {
    login: async (params: LoginParams) => {
      try {
      } catch (error) {
        console.tron.error(error);
      }
    },
    register: async (params: RegisterParams) => {
      try {
      } catch (error) {
        console.tron.log(error);
      }
    },
    setToken: (token: string) => {
      set(
        produce((state: AuthModel) => {
          state.token = token;
        }),
      );
    },
  };
};

export default AuthAction;
