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


//-------PRODUCT------------------------------------------------------------------------

    //get all product
    static async getAllProduct() {
        try {
            const response = await axios.get(
                `${BASE_URL}/products`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy tất cả sản phẩm thất bại';
        }
    }

    //get product by id
    static async getProductById(id) {
        try {
            const response = await axios.get(
                `${BASE_URL}/products/${id}`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy sản phẩm theo id thất bại';
        }
    }

    //get product by category id
    static async getProductByCategoryId(id) {
        try {
            const response = await axios.get(
                `${BASE_URL}/products/category/${id}`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy tất cả sản phẩm theo danh mục thất bại';
        }
    }


//-----------------------------------------------------------------------------------


//-------ORDER------------------------------------------------------------------------

    //get all
    static async getAllOrder() {
        try {
            const response = await axios.get(
                `${BASE_URL}/order`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy danh sách tất cả đơn hàng thất bại';
        }
    }

    //update status
    static async updateStatusOrder(id,newStatus) {
        try {
            const response = await axios.post(
                `${BASE_URL}/order/update-status/${id}?status=${newStatus}`,{},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'cập nhật trạng thái đơn hàng thất bại';
        }
    }

    //get order by id
    static async getOrderDetail(id) {
        try {
            const response = await axios.get(
                `${BASE_URL}/order/admin/${id}`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy đơn hàng theo id thất bại';
        }
    }


//-----------------------------------------------------------------------------------


//-------Auction------------------------------------------------------------------------

    //get auction by id
    static async getAuctionById(id) {
        try {
            const response = await axios.get(
                `${BASE_URL}/auctions/${id}`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy phiên đấu giá theo id thất bại';
        }
    }

    //end auction
    static async endAuction(id) {
        try {
            const response = await axios.post(
                `${BASE_URL}/auctions/end/${id}`,{},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Kết thúc phiên đấu giá thất bại';
        }
    }

    //bid
    static async placeBid(id,data) {
        try {
            const response = await axios.post(
                `${BASE_URL}/auctions/bid/${id}`,data,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Đặt giá thất bại';
        }
    }

    //create aucton
    static async createAuction(data) {
        try {
            const response = await axios.post(
                `${BASE_URL}/auctions/create`,data,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Tạo phiên đấu giá thất bại';
        }
    }


//-----------------------------------------------------------------------------------


}