import {clearStore} from 'const/StoreConst';
import AuthModel from 'models/AuthModel';
import MMKVServices from 'services/MMKVServices';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {StateCreator} from 'zustand/vanilla';

import AuthAction from './AuthActions';
const InitialStore = {
  isLogin: false,
  registerData: {
    name: "",
    username: "",
    password: "",
    height_cm: NaN,
    weight_kg: NaN,
    age: NaN,
  },
  token: undefined,
  refreshToken: undefined,
};

const authStore: StateCreator<AuthModel> = (set, get) => ({
  ...InitialStore,
  ...AuthAction(set),
  clear: () => clearStore(set, InitialStore),
});

const persistedAuthStore = persist(authStore, {
  name: 'auth-store',
  storage: createJSONStorage(() => new MMKVServices('auth-store')),
});

export const useAuthStore = create(persistedAuthStore);
