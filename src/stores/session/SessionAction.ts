import { produce } from 'immer';
import LoadingHelper from 'services/LoadingHelper';

import { useSessionStore } from './SessionStore';
import SessionModel from 'models/SessionModel';

const SessionActions = (set: any, get: any) => {
  return {
    profileRequest: async () => {
      try {
        const res = await getAccount();

        if (res.ok) {
          set(
            produce((state: SessionModel) => {
              state.profile = res?.data?.data;
            })
          );

          return res;
        } else {
          throw res;
        }
      } catch (error) {
        console.log(error, 'error');
        return error;
      } finally {
        LoadingHelper.hide();
      }
    },
    logout: () => {
      const {
        setProfile,
        setRefreshToken,
        setToken,
        setLogin,
      } = useSessionStore.getState();

      setRefreshToken('');
      setToken('');
      setLogin(false);
      setProfile({});
    },
    
    setProfile: (profile: any) => {
      set(
        produce((state: SessionModel) => {
          state.profile = profile;
        })
      );
    },
    setShowGuideModal: (value: boolean) => {
      set(
        produce((state: SessionModel) => {
          state.showGuideModal = value;
        })
      );
    },
  };
};

export default SessionActions;
