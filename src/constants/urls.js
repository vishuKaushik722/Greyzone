// const BASE_URL = "https://tech.kiet.edu/api/hrms/";
const BASE_URL = "https://softezi-greyzon-rishav.herokuapp.com/v1/";
// const BASE_URL = 'http://10.42.0.17:8000/'
// const BASE_URL = 'http://192.168.42.55:8000';

export default {
    GOOGLE_LOGIN: 'auth/google',
    GET_ALL_CATEGORY: 'items',
    ADD_NEW_ADDRESS: 'address',

    SEND_OTP: BASE_URL + 'otp/generate',
    VERIFY_OTP: BASE_URL + 'otp/verify',
    CREATE_PROFILE: BASE_URL + 'profile/create',
    GET_APPOINTMENT: BASE_URL + 'appointments',
    GET_EXPERTS: BASE_URL + 'experts',
    FIX_APPOINTMENT: BASE_URL + 'appointments',
    APPOINTMENTS_BY_EXPERT: BASE_URL + 'appointments/experts',
    GET_CATEGORIES: BASE_URL + "newItems/category",
    EDIT_INFORMATION: BASE_URL + "newUser/current"
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiI5Njk2ODA1NDIyIiwiaWF0IjoxNjI2OTgyNzUwLCJleHAiOjE2Mjk1NzQ3NTB9._d_EHzXzhJMeNqCOdUUeAq8QeKadk1q9FMoMXsElEeM
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOjk2OTY4MDU0MjIsImlhdCI6MTYyNzQwNzAyMywiZXhwIjoxNjI5OTk5MDIzfQ.y_v0D_mql6UbECnz8xgfqmt8lsV2nmN8IAYZz3PDgyU
