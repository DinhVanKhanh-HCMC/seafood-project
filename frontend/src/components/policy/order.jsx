import React from "react";

const OrderingGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Hướng Dẫn Đặt Hàng – SeaFresh
        </h1>

        <p className="text-gray-700 mb-6">
          SeaFresh mang đến cho bạn trải nghiệm đặt hàng hải sản tươi sống nhanh chóng, 
          đơn giản và tiện lợi. Dưới đây là hướng dẫn chi tiết giúp bạn hoàn tất 
          đơn hàng một cách dễ dàng.
        </p>

        {/* Step 1 */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          1. Tìm Kiếm & Chọn Sản Phẩm
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Thực hiện đăng nhập và truy cập trang sản phẩm tại SeaFresh.</li>
          <li>Xem thông tin chi tiết như mô tả, khối lượng, giá bán và hình ảnh.</li>
          <li>Chọn số lượng mong muốn.</li>
          <li>Nhấn nút <strong>“Thêm vào giỏ hàng”</strong>.</li>
        </ul>

        {/* Step 2 */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          2. Nhập Thông Tin Giao Hàng
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Truy cập vào trang cá nhân sau đó chọn mục địa chỉ</li>
          <li>Thực hiện thêm và chỉnh sửa địa chỉ</li>
          <li>Chọn địa chỉ mặc để giao hàng</li>
        </ul>

        {/* Step 3 */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          3. Kiểm Tra Giỏ Hàng
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Nhấn vào biểu tượng giỏ hàng ở góc trên bên phải.</li>
          <li>Kiểm tra lại số lượng và giá sản phẩm.</li>
          <li>Có thể cập nhật hoặc xóa sản phẩm khỏi giỏ hàng.</li>
          <li>Nhấn <strong>“Thanh toán”</strong> để tiếp tục.</li>
        </ul>

        

        {/* Step 4 */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          4. Chọn Phương Thức Thanh Toán
        </h2>
        <p className="text-gray-700">
          SeaFresh hỗ trợ thanh toán:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mt-2 space-y-2">
          <li>Thanh toán online qua Stripe (thẻ ngân hàng, Visa, MasterCard,...)</li>
          <li>Thanh toán COD (khi nhận hàng)</li>
        </ul>

        {/* Step 5 */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          5. Xác Nhận & Hoàn Tất Đơn Hàng
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Kiểm tra lại toàn bộ thông tin.</li>
          <li>Nhấn <strong>“Xác nhận thanh toán”</strong>.</li>
          <li>
            Hệ thống sẽ gửi email xác nhận đơn hàng từ SeaFresh.
          </li>
        </ul>

        {/* Step 6 */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          6. Theo Dõi Đơn Hàng
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Bạn có thể xem trạng thái đơn hàng trong mục <strong>“Đơn hàng của tôi”</strong>.</li>
          <li>
            Shipper sẽ gọi điện trước khi giao hàng.
          </li>
        </ul>

        {/* Support */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          7. Hỗ Trợ Khách Hàng
        </h2>
        <p className="text-gray-700">
          Nếu bạn gặp khó khăn khi đặt hàng, hãy liên hệ với SeaFresh:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mt-2">
          <li>Email: cskh.seafresh@gmail.com</li>
          <li>Hotline: 0999 858 533</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderingGuide;
