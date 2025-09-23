import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

export default class ApiService{

    static getHeader(withFormData = false) {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: token ? `Bearer ${token}` : '',
        };

        if (!withFormData) {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

//------------AUTH-----------------------


    //register
    static async register(formData) {
        try {
        const response = await axios.post(
            `${BASE_URL}/auth/register`,
            {email: formData.email, password: formData.password, fullName: formData.name, phone: formData.phone}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data || 'Đăng ký thất bại';
        }
    }
    //login
    static async login(email,password) {
        try {
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            {email,password}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'Đăng nhập thất bại';
        }
    }

    //login
    static async logout() {
        try {
        const response = await axios.post(
            `${BASE_URL}/auth/logout`,{},
            {headers: this.getHeader(false)}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'Đăng xuất thất bại';
        }
    }

    //check token valid
    static async verifyToken() {
        try {
        const response = await axios.get(
            `${BASE_URL}/auth/verify-token`,
            {headers: this.getHeader(false)}
        );
        return response;
        } catch (error) {
        throw error.response?.data?.message || 'Xác thực thất bại';
        }
    }



//---------------------------------------

//------------OTP-----------------------

    //send
    static async send(email,mode) {
        try {
        const response = await axios.post(
            `${BASE_URL}/otp/send`,
            {email,mode}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'Gửi otp thất bại';
        }
    }

    //verify
    static async verifyOTP(email,otp) {
        try {
        const response = await axios.post(
            `${BASE_URL}/otp/verify`,
            {email,otp}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'Xác thực thất bại';
        }
    }


//---------------------------------------

//-------------USER-----------------------

    //get current user
    static async getCurrentUser() {
        try {
        const response = await axios.get(
            `${BASE_URL}/users/me`,
            {headers: this.getHeader(false)}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'lấy user hiện tại thất bại';
        }
    }


//------------------------------------------



}