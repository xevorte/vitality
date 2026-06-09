import Config from 'react-native-config';

import apisauce, {ApiResponse, ApisauceInstance, HEADERS} from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from 'stores/auth/AuthStore';

class ApiService {
  api: ApisauceInstance;
  constructor() {
    const baseUrl = Config.BASE_URL || 'http://localhost:8000';

    this.api = apisauce.create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
      },
      timeout: 30000,
    });

    this.api.addRequestTransform((request) => {
      const token = useAuthStore.getState()?.token;

      if (token) {
        request.headers = {
          ...(request.headers || {}),
          Authorization: `Bearer ${token}`,
        };
      } else {
        delete request.headers?.Authorization;
      }
    });

    this.setHeaders = this.setHeaders.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.api.addMonitor(this.handleResponseMonitoring);
  }

  async handleResponseMonitoring(response: ApiResponse<any>) {
    const { status, config: originalRequest } = response;

    switch (status) {
      case 401:
        try {
          const refreshResponse = await new ApiService().refreshToken();

          if (!refreshResponse.ok) throw new Error('Refresh failed');

          const newAccessToken = refreshResponse.data.access_token;
          const newRefreshToken = refreshResponse.data.refresh_token;
          useAuthStore.getState().setToken(newAccessToken);
          useAuthStore.getState().setRefreshToken(newRefreshToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.tron.log(this.api, 'api refresh token');
          return this.api.any(originalRequest as AxiosRequestConfig<any>);
        } catch (error) {
          console.tron.log(error, 'error refresh token');
          useAuthStore.getState().logout();
        }
        break;
      default:
        return '';
    }
  }

  setHeaders(headers: HEADERS) {
    this.api.setHeaders(headers);
  }

  getInstance() {
    return this.api;
  }
};

export default new ApiService();
