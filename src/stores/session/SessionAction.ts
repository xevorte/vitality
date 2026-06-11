import { produce } from 'immer';
import LoadingHelper from 'services/LoadingHelper';

import SessionModel from 'models/SessionModel';
import { getGoalHealthGoalsGet, listGoalsHealthGoalsListGet } from 'api/generated/services/vitality/health-goals/health-goals';
import { BodyPredictPredictPost, GetNutritionDailyNutritionsGetParams, ListGoalsHealthGoalsListGetParams } from 'api/generated/models/vitality';
import { deleteNutritionDailyNutritionsEntryIdDelete, getNutritionDailyNutritionsGet, insertNutritionDailyNutritionsPost } from 'api/generated/services/vitality/daily-nutrition/daily-nutrition';
import { BodyInsertNutrition } from 'api/generated/models/vitality/bodyInsertNutrition';
import { predictPredictPost } from 'api/generated/services/vitality/prediction/prediction';

const SessionActions = (set: any, get: any) => {
  return {
    predictNutrition: async (params: BodyPredictPredictPost) => {
      try {
        LoadingHelper.show();

        const res: any = await predictPredictPost(params);

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
    getListNutritions: async (params: GetNutritionDailyNutritionsGetParams) => {
      try {
        LoadingHelper.show();

        const res: any = await getNutritionDailyNutritionsGet(params);

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
    createNutrition: async (params: BodyInsertNutrition) => {
      try {
        LoadingHelper.show();

        const res: any = await insertNutritionDailyNutritionsPost(params);

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
    deleteNutrition: async (params: number) => {
      try {
        LoadingHelper.show();

        const res: any = await deleteNutritionDailyNutritionsEntryIdDelete(params);

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
    getListGoals: async (params: ListGoalsHealthGoalsListGetParams) => {
      try {
        LoadingHelper.show();

        const res: any = await listGoalsHealthGoalsListGet(params);

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
    getUserGoal: async () => {
      try {
        LoadingHelper.show();

        const res: any = await getGoalHealthGoalsGet();

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
    setNutritions: (value: any) => {
      set(
        produce((state: SessionModel) => {
          state.nutritions = value;
        })
      );
    },
  };
};

export default SessionActions;
