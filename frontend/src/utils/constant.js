// const apiBase = import.meta.env.VITE_API_URL
//   ? 'http://localhost:5173'
//   : import.meta.env.VITE_API_URL;

// const apiBase = 'http://localhost:5000'||"https://jobportal-ahoq.onrender.com"  ;
const apiBase = "https://jobportal-ahoq.onrender.com"  ;

export const USER_API_END_POINT=`${apiBase}/api/v1/user`;
export const JOB_API_END_POINT=`${apiBase}/api/v1/job` ;
export const APPLICATION_API_END_POINT=`${apiBase}/api/v1/applications` ;
export const COMPANY_API_END_POINT=`${apiBase}/api/v1/company` ;
