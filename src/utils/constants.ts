// path router
export const urlRouter = {
  // Landing
  LANDING: '/',

  // Admin
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  ROOM: 'room',
  SERVICE: 'service', //dịch vụ
  DATA_POWER: 'DataPower', //tiền điện
  DATA_WATER: 'DataWater', //tiền nước
  OTHER_FREE: 'OtherFree', //phát sinh
  PAYMENT: 'Payment', // phiếu chi
  REPORT: 'Report',
  PG: 'pg',
  LIST_PG: 'list',

  // auth
  AUTH: 'auth',
  LOGIN: 'login',
  FORGOT_PASSWORD: 'auth/forgot-password',
};

// router link
export const pathUrl = {
  PATH_DASHBOARD: 'admin/dashboard',
  PATH_PG: 'pg',
};

// export const baseURL = process.env.BASE_URL
export const baseURL = process.env.REACT_APP_BASE_URL_API;

// Key localStorage
export const localStorageConstants = {
  ACCESS_TOKEN: 'access_token',
  USER: 'user',
};

export const httpMessage = {
  UPLOAD_SUCCESS: 'file uploaded successfully',
  UPLOAD_FAILED: 'file upload failed',
};
