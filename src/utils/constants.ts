// path router
export const urlRouter = {
  // client
  CLIENT_DASHBOARD: 'dashboard-user',
  CLIENT_SERVICE: 'service',
  CLIENT_CONTRACT: 'contract',
  CLIENT_ROOM: 'room',
  CLIENT_ARISE: 'arise',
  CLIENT_ASSET: 'asset',
  CLIENT_BILL: 'bill',
  CLIENT_WATER: 'water',
  CLIENT_ELECTRICITY: 'electricity',
  CLIENT_INFAORMATION: 'information',
  CLIENT_SENDNOTIFICATION: 'send-notification',
  CLIENT_CHANGEPASSWORD: 'Clientchangepassword',
  CLIENT_RECEIPT: 'Receipt',
  LAND_PAGE: 'lading-page',


  // Admin
  ADMIN: 'admin',
  HOMEPAGE: 'dashboard',
  DASHBOARD: 'dashboard',
  ROOM: 'room',
  LIST_MEMBER: 'listMember',
  LIST_ROOM: 'listRoom',
  CREATE_ROOM: 'createRoom',
  EDIT_ROOM: 'editRoom',
  UPDATE_ROOM: 'edit',
  CREATE_MEMBER: 'createMember',
  VIEW_MEMBER_IN_ROOM: 'view',// XEM THÀNH VIÊN TRONG PHÒNG
  UPDATE_MEMBER_IN_ROOM: 'update',
  SERVICE: 'service', //dịch vụ
  ADD_SERVICE: 'add-service', //dịch vụ
  DATA_POWER: 'DataPower', //tiền điện
  DATA_WATER: 'Da ', //tiền nước
  ARISE: 'arise', //dịch vụ
  ADD_ARISE: 'add-arise', //dịch vụ
  PAYMENT: 'Payment', // phiếu chi
  NOTIFICATION: 'notification', // thông báo
  REPORT: 'Report',
  UPDATE_DEPOSIT: 'update-deposit',
  ReportCustomerRent: 'ReportCustomerRent',// list khachs thuê phòng
  ReportCustomerContractExpired: 'ReportCustomerContractExpired', //danh sachs khach sap het hop dong 
  ReportInvoiceDetail: 'ReportInvoiceDetail',
  LIST_EMAIL: 'listEmail',
  CREATE_EMAIL: 'create-email',
  USER: 'user',
  USERREPORTDETAIL: 'userReportDetail',


  CREATE_ASSETS: 'create-assets',
  UPDATE_SERVICE: 'add-service', //dịch vụ
  UPDATE_ARISE: 'update-arise', //dịch vụ
  WATER: 'water', //
  ELECTRICITY: 'electricity',
  PG: 'pg',
  LIST_PG: 'list',
  ASSETS: 'assets',
  ESTABLISH: 'establish',
  CHARGE: 'charge',
  KEEP_ROOM: 'keep-room',
  CREATE_KEEP_ROOM: 'create-keep-room',
  // auth
  AUTH: 'auth',
  FORGOT_PASSWORD: 'auth/forgot-password',
  CREATE_NEW_PASSWORD: 'auth/create-new-password'
};

// router link
export const pathUrl = {
  PATH_DASHBOARD: 'admin/dashboard',
  PATH_PG: 'pg',
};

// export const baseURL = process.env.BASE_URL
export const baseURL = process.env.REACT_APP_BASE_API;

// Key localStorage
export const localStorageConstants = {
  ACCESS_TOKEN: 'access_token',
  USER: 'user',
};

export const httpMessage = {
  UPLOAD_SUCCESS: 'file uploaded successfully',
  UPLOAD_FAILED: 'file upload failed',
};

export const limitCountUpload = {
  LIMIT_COUNT: 6,
  LIMIT_SIZE: 2,
}