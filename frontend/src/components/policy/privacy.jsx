import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Chính Sách Bảo Mật
        </h1>

        <p className="text-gray-700 mb-6">
          Trang web <strong>SeaFresh</strong> cam kết bảo vệ quyền riêng tư và
          thông tin cá nhân của khách hàng. Chính sách này mô tả cách chúng tôi
          thu thập, sử dụng và bảo vệ thông tin của bạn khi truy cập và sử dụng
          các dịch vụ tại website của chúng tôi.
        </p>

        {/* 1. Thông tin thu thập */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Thông Tin Chúng Tôi Thu Thập
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>Thông tin cá nhân:</strong> Họ tên, số điện thoại, email,
            địa chỉ giao hàng.
          </li>
          <li>
            <strong>Thông tin thanh toán:</strong> Chỉ gồm mã giao dịch từ bên
            thứ ba (Stripe). Chúng tôi <strong>không</strong> lưu trữ số thẻ hoặc
            thông tin nhạy cảm.
          </li>
          <li>
            <strong>Dữ liệu kỹ thuật:</strong> Cookies, địa chỉ IP, loại trình
            duyệt, thời gian truy cập.
          </li>
          <li>
            <strong>Thông tin đơn hàng:</strong> Sản phẩm đã mua, số lượng, thời
            gian đặt hàng, trạng thái thanh toán.
          </li>
        </ul>

        {/* 2. Mục đích */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Mục Đích Sử Dụng Thông Tin
        </h2>
        <p className="text-gray-700 mb-4">
          Chúng tôi sử dụng thông tin nhằm đảm bảo trải nghiệm tốt nhất cho
          khách hàng:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Xử lý và quản lý đơn hàng của bạn.</li>
          <li>Cung cấp thông tin về sản phẩm, chương trình khuyến mãi.</li>
          <li>Hỗ trợ khách hàng trong quá trình giao dịch.</li>
          <li>Cải thiện chất lượng dịch vụ và giao diện website.</li>
          <li>Ngăn chặn các hành vi gian lận hoặc vi phạm chính sách.</li>
        </ul>

        {/* 3. Bảo mật */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Bảo Mật Thông Tin
        </h2>
        <p className="text-gray-700">
          Chúng tôi áp dụng nhiều biện pháp kỹ thuật để bảo vệ dữ liệu, bao gồm:
        </p>
        <ul className="list-disc ml-6 text-gray-700 my-4 space-y-2">
          <li>Mã hóa dữ liệu truyền tải qua HTTPS.</li>
          <li>Lưu trữ thông tin trên hệ thống có tính bảo mật cao.</li>
          <li>
            Không chia sẻ dữ liệu cá nhân của khách hàng cho bên thứ ba nếu
            không có sự đồng ý.
          </li>
          <li>
            Tất cả thanh toán được xử lý thông qua bên thứ ba uy tín (Stripe).
          </li>
        </ul>

        {/* 4. Cookies */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
        <p className="text-gray-700 mb-4">
          Website sử dụng cookies để tối ưu trải nghiệm người dùng:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Ghi nhớ phiên đăng nhập.</li>
          <li>Tối ưu tốc độ tải trang.</li>
          <li>Phân tích hành vi truy cập để cải thiện dịch vụ.</li>
        </ul>

        {/* 5. Quyền của khách hàng */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          5. Quyền của Người Dùng
        </h2>
        <p className="text-gray-700 mb-4">Bạn có quyền:</p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Yêu cầu xem lại thông tin cá nhân đã cung cấp.</li>
          <li>Yêu cầu chỉnh sửa nếu dữ liệu không chính xác.</li>
          <li>Yêu cầu xóa tài khoản hoặc thông tin cá nhân.</li>
          <li>Hủy đăng ký nhận email quảng cáo bất cứ lúc nào.</li>
        </ul>

        {/* 6. Chia sẻ thông tin */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Chia Sẻ Dữ Liệu Cho Bên Thứ Ba
        </h2>
        <p className="text-gray-700 mb-4">
          Chúng tôi chỉ chia sẻ dữ liệu trong các trường hợp:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            Đối tác giao hàng cần thông tin để vận chuyển sản phẩm.
          </li>
          <li>
            Đơn vị thanh toán như Stripe để xử lý giao dịch an toàn.
          </li>
          <li>
            Cơ quan pháp luật yêu cầu cung cấp theo quy định của nhà nước.
          </li>
        </ul>

        {/* 7. Thay đổi chính sách */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Thay Đổi Chính Sách Bảo Mật
        </h2>
        <p className="text-gray-700 mb-4">
          Chúng tôi có thể cập nhật chính sách này theo định kỳ. Mọi thay đổi sẽ
          được công bố công khai trên website.
        </p>

        {/* 8. Liên hệ */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Liên Hệ</h2>
        <p className="text-gray-700">
          Nếu bạn có bất kỳ câu hỏi nào liên quan đến Chính Sách Bảo Mật, vui
          lòng liên hệ:
        </p>
        <ul className="list-disc ml-6 text-gray-700 my-4 space-y-2">
          <li>Email: <strong>cskh.seafresh@gmail.com</strong></li>
          <li>SĐT: <strong>0999 858 533</strong></li>
          <li>Địa chỉ: Phạm Hùng - Phường 04 - Quận 08 - TPHCM</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
