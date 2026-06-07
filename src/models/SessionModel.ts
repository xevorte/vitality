import StoreModel from './StoreModel';
import { RegisterUserResult } from 'api/generated/services/vitality/users/users';

export interface Profile {
  id?: string;
  avatarUrl?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  identityNumber?: string;
  approvedAt?: string;
}

interface SessionModel extends StoreModel {
  showGuideModal: boolean;
  profile?: Profile;
  setProfile: (data: Profile) => void;
  setShowGuideModal: (data: boolean) => void;
  profileRequest: () => void;
}

export default SessionModel;
