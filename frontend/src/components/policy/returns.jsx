import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Chính Sách Đổi Trả Hàng – SeaFresh
        </h1>

        <p className="text-gray-700 mb-6">
          SeaFresh cam kết mang đến cho khách hàng những sản phẩm hải sản tươi sống 
          và chất lượng nhất. Chúng tôi hiểu rằng việc vận chuyển sản phẩm tươi 
          sống luôn có những rủi ro nhất định, vì vậy chính sách đổi trả được xây 
          dựng nhằm đảm bảo quyền lợi tối đa cho khách hàng.
        </p>

        {/* Điều kiện */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          1. Điều Kiện Đổi Trả
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Sản phẩm bị hư hỏng, dập nát, không còn tươi khi nhận hàng.</li>
          <li>Sản phẩm giao sai so với đơn đặt hàng.</li>
          <li>Sản phẩm có dấu hiệu không đảm bảo vệ sinh hoặc bị lỗi kỹ thuật trong đóng gói.</li>
          <li>
            Khách hàng cần quay video mở hàng <strong>từ lúc bắt đầu</strong> để 
            chứng minh tình trạng sản phẩm khi nhận.
          </li>
        </ul>

        {/* Không áp dụng */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          2. Các Trường Hợp Không Hỗ Trợ Đổi Trả
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Sản phẩm đã qua chế biến hoặc không còn nguyên trạng.</li>
          <li>
            Sản phẩm bảo quản sai hướng dẫn dẫn đến giảm chất lượng.
          </li>
          <li>
            Khách hàng không cung cấp video mở hàng hoặc bằng chứng xác thực.
          </li>
          <li>
            Đơn hàng đã giao hơn <strong>24 giờ</strong>.
          </li>
        </ul>

        {/* Quy trình */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          3. Quy Trình Đổi Trả
        </h2>
        <ol className="list-decimal ml-6 text-gray-700 space-y-2">
          <li>Liên hệ SeaFresh qua hotline hoặc email hỗ trợ.</li>
          <li>Cung cấp mã đơn hàng + video mở hàng hoặc hình ảnh sản phẩm bị lỗi.</li>
          <li>SeaFresh xác nhận và phản hồi trong vòng 24 giờ.</li>
          <li>
            Hoàn tiền hoặc gửi sản phẩm thay thế tùy theo thỏa thuận.
          </li>
        </ol>

        {/* Hình thức hoàn tiền */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          4. Hình Thức Hoàn Tiền
        </h2>
        <p className="text-gray-700 mb-4">
          Khách hàng có thể chọn một trong hai hình thức:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Hoàn tiền qua ví điện tử hoặc tài khoản ngân hàng.</li>
          <li>Nhận phiếu mua hàng cho lần tiếp theo.</li>
        </ul>

        {/* Liên hệ */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Liên Hệ</h2>
        <p className="text-gray-700">
          Mọi yêu cầu đổi trả xin vui lòng liên hệ:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mt-2">
          <li>Email: cskh.seafresh@gmail.com</li>
          <li>Hotline: 0999 858 533</li>
          <li>Địa chỉ: Phạm Hùng - Phường 04 - Quận 08 - TPHCM</li>
        </ul>
      </div>
    </div>
  );
};

export default ReturnPolicy;
