import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public userMessage?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const createApiErrorHandler = (context: string) => {
  return (error: unknown): ApiError => {
    // Axios 에러인 경우
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      
      switch (status) {
        case 401:
          return new ApiError(
            `${context}: Unauthorized - Invalid API key`,
            401,
            'API 인증에 실패했습니다. 관리자에게 문의해주세요.',
            error
          );
        case 404:
          return new ApiError(
            `${context}: Resource not found`,
            404,
            '요청한 정보를 찾을 수 없습니다.',
            error
          );
        case 429:
          return new ApiError(
            `${context}: Rate limit exceeded`,
            429,
            '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
            error
          );
        case 500:
        case 502:
        case 503:
        case 504:
          return new ApiError(
            `${context}: Server error (${status})`,
            status,
            '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
            error
          );
        default:
          return new ApiError(
            `${context}: HTTP ${status} - ${statusText}`,
            status,
            '네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.',
            error
          );
      }
    }
    
    // 네트워크 에러인 경우
    if (error instanceof Error && error.message.includes('Network Error')) {
      return new ApiError(
        `${context}: Network error`,
        0,
        '인터넷 연결을 확인해주세요.',
        error
      );
    }
    
    // 기타 에러
    return new ApiError(
      `${context}: Unknown error`,
      0,
      '알 수 없는 오류가 발생했습니다.',
      error
    );
  };
};

// 로그 유틸리티
export const logError = (error: ApiError) => {
  console.error(`[API Error] ${error.message}`, {
    status: error.status,
    userMessage: error.userMessage,
    originalError: error.originalError
  });
};

// 에러를 사용자에게 보여주기 위한 메시지 추출
export const getUserErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.userMessage || '알 수 없는 오류가 발생했습니다.';
  }
  
  if (error instanceof Error) {
    return '처리 중 오류가 발생했습니다.';
  }
  
  return '알 수 없는 오류가 발생했습니다.';
};