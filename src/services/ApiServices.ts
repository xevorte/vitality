import Config from 'react-native-config';

import apisauce, {ApiResponse, ApisauceInstance, HEADERS} from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import { useSessionStore } from 'stores/session/SessionStore';

class ApiService {
  api: ApisauceInstance;
  constructor() {
    const baseUrl = Config.BASE_URL;
    this.api = apisauce.create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: useSessionStore.getState()?.token
          ? `Bearer ${useSessionStore.getState()?.token}`
          : '',
      },
      timeout: 30000,
    });
    this.api = apisauce.create({
      baseURL: `${Config.KEYCLOACK_URL}realms/${Config.KEYCLOAK_REALM}/protocol/openid-connect/`,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/x-www-form-urlencoded',
      },
      timeout: 30000,
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
          useSessionStore.getState().setToken(newAccessToken);
          useSessionStore.getState().setRefreshToken(newRefreshToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.tron.log(this.api, 'api refresh token');
          return this.api.any(originalRequest as AxiosRequestConfig<any>);
        } catch (error) {
          console.tron.log(error, 'error refresh token');
          useSessionStore.getState().logout();
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
