export enum Activity {
  LOGIN = 'login-activity',
  ACCOUNT_CREATION = 'register-activity',
  LOGOUT = 'logout-activity',
}

export enum ActivityType {
  LOGIN = 'LOGIN',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  ACCOUNT_CREATION = 'ACCOUNT_CREATION',
  WITHDRAWAL_CREATION = 'WITHDRAWAL_CREATION',
  DEPOSIT_CREATION = 'DEPOSIT_CREATION',
  ORDER_PLACEMENT = 'ORDER_PLACEMENT',
  ORDER_CANCELLATION = 'ORDER_CANCELLATION',
  ACCOUNT_WALLET_CHANGES = 'ACCOUNT_WALLET_CHANGES',
  ACCOUNT_SETTING_CHANGES = 'ACCOUNT_SETTING_CHANGES',
  ACCOUNT_PROFILE_CHANGES = 'ACCOUNT_PROFILE_CHANGES',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  API_REQUEST = 'API_REQUEST',
  SECURITY_EVENT = 'SECURITY_EVENT',
  ADMIN_ACTION = 'ADMIN_ACTION',
  EMAIL_NOTIFICATION = 'EMAIL_NOTIFICATION',
  SMS_NOTIFICATTION = 'SMS_NOTIFICATTION',
}
