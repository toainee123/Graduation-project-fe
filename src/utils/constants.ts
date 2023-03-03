
// path router
export const urlRouter = {
    // Landing
    LANDING: '/',

    // Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    PG: 'pg',
    LIST_PG: 'list',
    
    // auth
    AUTH: 'auth',
    LOGIN: 'login',
    FORGOT_PASSWORD: 'auth/forgot-password'
}

// router link
export const pathUrl = {
    PATH_DASHBOARD: 'admin/dashboard',
    PATH_PG: 'pg',
}

// export const baseURL = process.env.BASE_URL
export const baseURL = process.env.REACT_APP_BASE_URL_API

// Key localStorage
export const localStorageConstants = {
    ACCESS_TOKEN: 'access_token',
    USER: 'user',
}