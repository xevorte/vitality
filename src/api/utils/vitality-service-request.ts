import { ApiErrorResponse, ApiResponse, ApisauceConfig } from 'apisauce';
import ApiService from 'services/ApiServices';

const apisauce = ApiService.getInstance();

export const vitalityServiceRequest = async <T>(
  config: Omit<ApisauceConfig, 'baseURL'>,
  options?: ApisauceConfig
): Promise<ApiResponse<T>> => {
  const { url, ...restOfConfig } = config;
  const prefixUrl = `/${url?.replace(/^\//, '')}`;
  const response = await apisauce[config.method?.toLowerCase()](
    prefixUrl,
    restOfConfig.data || restOfConfig.params,
    options
  );
  return response;
};

export type ErrorType<Error> = ApiErrorResponse<Error>;

export type BodyType<BodyData> = BodyData;
