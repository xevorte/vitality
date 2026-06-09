import { BodyPredictPredictPost, GetNutritionDailyNutritionsGetParams, ListGoalsHealthGoalsListGetParams } from 'api/generated/models/vitality';
import StoreModel from './StoreModel';
import { BodyInsertNutrition } from 'api/generated/models/vitality/bodyInsertNutrition';

export interface Profile {
  id?: number;
  name?: string;
  username?: string;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  age?: number;
  health_goal?: string;
  activity_level?: string;
  created_at?: any;
}

interface SessionModel extends StoreModel {
  showGuideModal: boolean;
  profile?: Profile;
  predictNutrition: (params: BodyPredictPredictPost) => void;
  getListNutritions: (params: GetNutritionDailyNutritionsGetParams) => void;
  createNutrition: (params: BodyInsertNutrition) => void;
  deleteNutrition: (params: number) => void;
  getListGoals: (params: ListGoalsHealthGoalsListGetParams) => void;
  getUserGoal: () => void;
  setProfile: (data: Profile) => void;
  setShowGuideModal: (data: boolean) => void;
}

export default SessionModel;
