import { clearStore } from 'const/StoreConst';
import SessionModel from 'models/SessionModel';
import MMKVServices from 'services/MMKVServices';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';

import SessionActions from './SessionAction';

const InitialStore = {
  nutritions: [],
  showGuideModal: false,
  profile: undefined,
};

const sessionStore: StateCreator<SessionModel> = (set, get) => ({
  ...InitialStore,
  ...SessionActions(set, get),
  clear: () => clearStore(set, InitialStore),
});

const persistedSessionStore = persist(sessionStore, {
  name: 'session-store',
  storage: createJSONStorage(() => new MMKVServices('session-store')),
});

export const useSessionStore = create(persistedSessionStore);
