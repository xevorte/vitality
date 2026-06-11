import { ApiErrorResponse, ApiResponse, ApisauceConfig } from 'apisauce';
import ApiService from 'services/ApiServices';

const apisauce = ApiService.getInstance();

export const vitalityServiceRequest = async <T>(
  config: Omit<ApisauceConfig, 'baseURL'>,
  options?: ApisauceConfig
): Promise<ApiResponse<T>> => {
  const { url, headers, ...restOfConfig } = config;
  const prefixUrl = `/${url?.replace(/^\//, '')}`;

  const mergedOptions = {
    ...(options || {}),
    headers: {
      ...(options?.headers || {}),
      ...(headers || {}),
    },
  };

  const method = config.method?.toLowerCase() || 'get';
  const response = await apisauce[method](
    prefixUrl,
    restOfConfig.data ?? restOfConfig.params,
    mergedOptions
  );

  return response;
};

export type ErrorType<Error> = ApiErrorResponse<Error>;

export type BodyType<BodyData> = BodyData;
