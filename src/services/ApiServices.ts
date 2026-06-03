import Config from 'react-native-config';

import apisauce, {ApisauceInstance} from 'apisauce';
import {useAuthStore} from 'stores/auth/AuthStore';

class ApiService {
  api: ApisauceInstance;
  constructor() {
    const baseURL = `${Config.BASE_URL}`;
    this.api = apisauce.create({
      baseURL,
      headers: {
        'Cache-Control': 'no-cache',
        Cookie: `${useAuthStore.getState()?.token}`,
      },
      // 10 second timeout...
      timeout: 60000,
    });
  }
};

export default new ApiService();
