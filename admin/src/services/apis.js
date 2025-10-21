import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

export default class ApiService {

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
    

//-------AUTH-------------------------------------------------------------------------------------------------------------------------------------------------

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

    //logout
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

//-----------------------------------------------------------------------------------

}