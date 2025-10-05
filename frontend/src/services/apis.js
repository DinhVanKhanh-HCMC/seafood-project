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

//-------------CATEGORY-----------------------

    //get all category
    static async getAllCategory() {
        try {
            const response = await axios.get(
                `${BASE_URL}/category`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy tất cả danh mục thất bại';
        }
    }


//------------------------------------------

//-------------PRODUCT-----------------------

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

//------------------------------------------

//-------------REVIEW-----------------------

    //get all review of product id
    static async getAllReviewOfProduct(id) {
        try {
            const response = await axios.get(
                `${BASE_URL}/reviews/product/${id}`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy tất cả đánh giá của sản phẩm thất bại';
        }
    }

    //write review
    static async createReview(data) {
        try {
            const response = await axios.post(
                `${BASE_URL}/reviews/add`,data,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'viết đánh giá thất bại';
        }
    }




//------------------------------------------

//-------------CART-----------------------

    //add item to cart
    static async addCartItem(data) {
        try {
            const response = await axios.post(
                `${BASE_URL}/cart/add`,data,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Thêm item vào giỏ thất bại';
        }
    }

     //get cart
    static async getCart() {
        try {
            const response = await axios.get(
                `${BASE_URL}/cart`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy giỏ hàng thất bại';
        }
    }

    //add item to cart
    static async updateCartItem(id, quantity) {
        try {
            const response = await axios.post(
                `${BASE_URL}/cart/update/${id}`,{quantity: quantity},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'update số lượng item giỏ hàng thất bại';
        }
    }

    //add item to cart
    static async deleteCartItem(id) {
        try {
            const response = await axios.post(
                `${BASE_URL}/cart/delete/${id}`,{},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'xoá item thất bại';
        }
    }


//------------------------------------------






}