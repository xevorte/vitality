import Config from 'react-native-config';

import apisauce, {ApiResponse, ApisauceInstance, HEADERS} from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from 'stores/auth/AuthStore';

class ApiService {
  api: ApisauceInstance;
  constructor() {
    const baseUrl = Config.BASE_URL || 'https://snowdrift-flashy-septum.ngrok-free.dev';

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

  predict(params: any): Promise<ApiResponse<any>> {
    const file = params?.file ?? params;
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }

    return this.api.post('/predict/', formData, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  createNutrition(params: any): Promise<ApiResponse<any>> {
    const formData = new FormData();

    if (params?.category) {
      formData.append('category', params?.category);
    }

    if (params?.date) {
      formData.append('date', params?.date);
    }

    if (params?.food_name) {
      formData.append('food_name', params?.food_name);
    }

    if (params?.nutrition) {
      formData.append('nutrition', JSON.stringify(params?.nutrition));
    }

    if (params?.food_image) {
      formData.append('food_image', params?.food_image);
    }

    return this.api.post('/daily-nutritions/', formData, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

export default new ApiService();
