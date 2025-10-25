import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
const URL_PROVINCE = 'https://provinces.open-api.vn/api';

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
            {email: formData.email, password: formData.password, fullName: formData.name, phone: formData.phone, dateOfBirth: formData.dateOfBirth}
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

    //reset password
    static async resetPassword(data) {
        try {
        const response = await axios.post(
            `${BASE_URL}/auth/reset-password`,
            data
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'Lấy lại mật khẩu thất bại';
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

    //update user
    static async updateUser(id,data) {
        try {
        const response = await axios.post(
            `${BASE_URL}/users/update/${id}`,data,
            {headers: this.getHeader(true)}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'update user thất bại';
        }
    }

    //update user
    static async changePassword(data) {
        try {
        const response = await axios.post(
            `${BASE_URL}/users/change-password`,data,
            {headers: this.getHeader(false)}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'Đổi mật khẩu thất bại';
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

//-------------ORDER-----------------------

    //create order 
    static async createOrder(address,paymentMethod) {
        try {
            const response = await axios.post(
                `${BASE_URL}/order/create`,{addressId: address, paymentMethod: paymentMethod},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Tạo đơn hàng thất bại';
        }
    }

    //get order by id
    static async getOrderById(id) {
        try {
            const response = await axios.get(
                `${BASE_URL}/order/${id}`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy đơn hàng theo id thất bại';
        }
    }

    //get order by id
    static async getMyOrder() {
        try {
            const response = await axios.get(
                `${BASE_URL}/order/my-orders`,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Lấy danh sách đơn hàng thất bại';
        }
    }

    //cancel order
    static async cancelOrder(id) {
        try {
            const response = await axios.post(
                `${BASE_URL}/order/cancel/${id}`,{},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Huỷ đơn hàng thất bại';
        }
    }

//------------------------------------------


//-------------PAYMENT-----------------------

    //write review
    static async createPayment(orderId, paymentMethod) {
        try {
            const response = await axios.post(
                `${BASE_URL}/payment/create/${orderId}?method=${paymentMethod}`,{},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Tạo thanh toán thất bại';
        }
    }

    // services/apis.js
    static async verifyStripePayment(sessionId) {
    try {
        const response = await axios.post(
        `${BASE_URL}/payment/stripe/callback?session_id=${sessionId}`,
        {},
        { headers: this.getHeader() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Xác thực thanh toán thất bại';
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



//-------------OPEN API VN PROVINCE-----------------------


  static async getAllProvinces() {
    try {
      const response = await axios.get(`${URL_PROVINCE}/p/`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Lấy danh sách tỉnh/thành thất bại';
    }
  }

  static async getDistrictsByProvince(provinceCode) {
    try {
      const response = await axios.get(`${URL_PROVINCE}/p/${provinceCode}?depth=2`);
      return response.data.districts || [];
    } catch (error) {
      throw error.response?.data?.message || 'Lấy danh sách quận/huyện thất bại';
    }
  }

  static async getWardsByDistrict(districtCode) {
    try {
      const response = await axios.get(`${URL_PROVINCE}/d/${districtCode}?depth=2`);
      return response.data.wards || [];
    } catch (error) {
      throw error.response?.data?.message || 'Lấy danh sách phường/xã thất bại';
    }
  }

  static async findProvinceCodeByName(provinceName) {
    try {
        const provinces = await this.getAllProvinces();
        const province = provinces.find(p => 
        p.name === provinceName || 
        p.name.replace('Tỉnh ', '').replace('Thành phố ', '') === provinceName ||
        p.name.includes(provinceName)
        );
        return province ? province.code : null;
    } catch (error) {
        console.error('Error finding province:', error);
        return null;
    }
    }

    static async findDistrictCodeByName(provinceCode, districtName) {
    try {
        const districts = await this.getDistrictsByProvince(provinceCode);
        const district = districts.find(d => 
        d.name === districtName || 
        d.name.replace('Quận ', '').replace('Huyện ', '').replace('Thành phố ', '') === districtName ||
        d.name.includes(districtName)
        );
        return district ? district.code : null;
    } catch (error) {
        console.error('Error finding district:', error);
        return null;
    }
    }

    static async findWardCodeByName(districtCode, wardName) {
    try {
        const wards = await this.getWardsByDistrict(districtCode);
        const ward = wards.find(w => 
        w.name === wardName || 
        w.name.replace('Phường ', '').replace('Xã ', '').replace('Thị trấn ', '') === wardName ||
        w.name.includes(wardName)
        );
        return ward ? ward.code : null;
    } catch (error) {
        console.error('Error finding ward:', error);
        return null;
    }
    }

    static async parseAddressToCodes(fullAddress) {
        const parts = fullAddress.split(', ');
        
        const street = parts[0] || '';
        const wardName = parts[1] || '';
        const districtName = parts[2] || '';
        const provinceName = parts[3] || '';

        let provinceCode = null;
        let districtCode = null;
        let wardCode = null;

        // Tìm province code
        if (provinceName) {
            provinceCode = await this.findProvinceCodeByName(provinceName);
        }

        // Tìm district code (cần có province code trước)
        if (provinceCode && districtName) {
            districtCode = await this.findDistrictCodeByName(provinceCode, districtName);
        }

        // Tìm ward code (cần có district code trước)
        if (districtCode && wardName) {
            wardCode = await this.findWardCodeByName(districtCode, wardName);
        }

        return {
            street,
            wardName,
            wardCode,
            districtName, 
            districtCode,
            provinceName,
            provinceCode,
            success: !!(provinceCode && districtCode && wardCode) // true nếu tìm được cả 3
        };
    }


//------------------------------------------


//-------------ADDRESS-----------------------

    static async getAddressUserLogin() {
        try {
        const response = await axios.get(
            `${BASE_URL}/address`,
            {headers: this.getHeader(false)}
        );
        return response.data;
        } catch (error) {
        throw error.response?.data?.message || 'Lấy danh sách địa chỉ thất bại';
        }
    }

    //add address
    static async addAddress(data) {
        try {
            const response = await axios.post(
                `${BASE_URL}/address/add`,data,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'thêm địa chỉ thất bại';
        }
    }

    //add address
    static async updateAddress(id,data) {
        try {
            const response = await axios.post(
                `${BASE_URL}/address/update/${id}`,data,
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Cập nhật địa chỉ thất bại';
        }
    }

    //delete address
    static async deleteAddress(id) {
        try {
            const response = await axios.post(
                `${BASE_URL}/address/delete/${id}`,{},
                {headers: this.getHeader(false)}
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'xoá địa chỉ thất bại';
        }
    }

//------------------------------------------

}