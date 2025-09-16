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



}