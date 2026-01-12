
const apiBase =
  process.env.NODE_ENV === 'development'
    &&'http://localhost:5000'
    ;

export const USER_API_END_POINT=`${apiBase}/api/v1/user`;

// export const NOTIFICATION_API_END_POINT=`${apiBase}/api/v1/notifications` ;
