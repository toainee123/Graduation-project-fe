// path router
export const urlRouter = {
  // Landing
  LANDING: '/',

  // Admin
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  ROOM: 'room',
  CREATE_ROOM: 'creat',
  SERVICE: 'service', //dịch vụ
  ADD_SERVICE: 'add-service', //dịch vụ
  DATA_POWER: 'DataPower', //tiền điện
  DATA_WATER: 'Da ', //tiền nước
  ARISE: 'arise', //dịch vụ
  ADD_ARISE: 'add-arise', //dịch vụ
  PAYMENT: 'Payment', // phiếu chi
  REPORT: 'Report',
  ReportCustomerRent: 'ReportCustomerRent',// list khachs thuê phòng
  ReportCustomerContractExpired: 'ReportCustomerContractExpired', //danh sachs khach sap het hop dong 
  ReportInvoiceDetail: 'ReportInvoiceDetail',



  PG: 'pg',
  LIST_PG: 'list',
  ESTABLISH: 'establish',
  CHARGE: 'charge',

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
