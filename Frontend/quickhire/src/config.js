// For adding API's here instead of using it directly into the components
export const CONFIG = {
    BASE_PATH: process.env.REACT_APP_BACKEND_URL,
    SIGNUP_PATH: 'auth/register',
    LOGIN_PATH: 'auth/login',
    FORGOT_PASSWORD_PATH: 'auth/forgot-password',
    CHANGE_PASSWORD_PATH: 'auth/change-password/',
    VALIDATE_TOKEN_PATH: 'auth/validate-token/',
    USER_PATH: 'user'
};
