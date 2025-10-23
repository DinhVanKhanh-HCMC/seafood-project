package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.responses.PaymentResponse;
import com.dinhvankhanh.seafood.enums.OrderStatus;
import com.dinhvankhanh.seafood.enums.PaymentMethod;
import com.dinhvankhanh.seafood.enums.PaymentStatus;
import com.dinhvankhanh.seafood.enums.UserRole;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.PaymentMapper;
import com.dinhvankhanh.seafood.models.Order;
import com.dinhvankhanh.seafood.models.Payment;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.OrderRepository;
import com.dinhvankhanh.seafood.repositories.PaymentRepository;
import com.dinhvankhanh.seafood.services.CartService;
import com.dinhvankhanh.seafood.services.PaymentService;
import com.dinhvankhanh.seafood.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final StripeService stripeService;
    private final PaymentMapper paymentMapper;
    private final CartService cartService;

    @Override
    public PaymentResponse createPayment(String orderId, PaymentMethod method) {
        User user = userService.getUserLogin();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ErrorException(ErrorCode.ORDER_NOT_FOUND));

        // Kiểm tra nếu đã có payment cho order
        paymentRepository.findByOrderId(orderId).ifPresent(p -> {
            throw new ErrorException(ErrorCode.BAD_REQUEST, "Payment đã tồn tại trong đơn hàng này");
        });

        Payment payment = Payment.builder()
                .orderId(orderId)
                .amount(order.getTotalPrice())
                .method(method)
                .status(PaymentStatus.PENDING)
                .build();

        // Xử lý thanh toán Stripe nếu là thẻ
        if (method == PaymentMethod.CARD) {
            PaymentResponse stripeResponse = stripeService.createStripePaymentSession(
                    orderId, order.getTotalPrice(), order.getItems(), "/payment/callback");

            if (!stripeResponse.getSuccess()) {
                throw new ErrorException(ErrorCode.BAD_REQUEST,
                        "Tạo session thanh toán thất bại: " + stripeResponse.getMessage());
            }

            // Lưu stripe session ID
            payment.setStripeSessionId(stripeResponse.getStripeSessionId());

            Payment savedPayment = paymentRepository.save(payment);
            PaymentResponse response = paymentMapper.mapperToPaymentResponse(savedPayment);

            // Thêm thông tin Stripe vào response
            response.setSessionUrl(stripeResponse.getSessionUrl());
            response.setStripeSessionId(stripeResponse.getStripeSessionId());
            response.setSuccess(true);

            return response;
        }

        // Thanh toán COD - chỉ lưu payment
        Payment savedPayment = paymentRepository.save(payment);
        PaymentResponse response = paymentMapper.mapperToPaymentResponse(savedPayment);
        response.setSuccess(true);
        response.setMessage("Tạo payment COD thành công");

        cartService.clearCart();

        return response;
    }

    @Override
    public PaymentResponse getPaymentByOrder(String orderId) {
        User user = userService.getUserLogin();
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ErrorException(ErrorCode.PAYMENT_NOT_FOUND));

        PaymentResponse response = paymentMapper.mapperToPaymentResponse(payment);

        // Nếu là Stripe payment và chưa thanh toán, có thể check status
        if (payment.getMethod() == PaymentMethod.CARD &&
                payment.getStatus() == PaymentStatus.PENDING &&
                payment.getStripeSessionId() != null) {

            PaymentResponse stripeStatus = stripeService.verifyPayment(payment.getStripeSessionId());
            if (stripeStatus.getSuccess()) {
                // Cập nhật status nếu đã thanh toán
                payment.setStatus(PaymentStatus.SUCCESS);
                paymentRepository.save(payment);
                response.setStatus(PaymentStatus.SUCCESS);
            }
        }

        return response;
    }

    @Override
    public PaymentResponse updateStatus(String paymentId, PaymentStatus status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ErrorException(ErrorCode.PAYMENT_NOT_FOUND));

        // Chỉ admin mới có quyền đổi status
        User user = userService.getUserLogin();
        if (!UserRole.ADMIN.equals(user.getRole())) {
            throw new ErrorException(ErrorCode.FORBIDDEN, "Chỉ ADMIN mới có thể chỉnh sửa trạng thái payment");
        }

        payment.setStatus(status);
        paymentRepository.save(payment);

        PaymentResponse response = paymentMapper.mapperToPaymentResponse(payment);
        response.setSuccess(true);
        response.setMessage("Cập nhật trạng thái payment thành công");

        return response;
    }

    // Thêm method mới để xử lý callback từ Stripe
    @Override
    public PaymentResponse handleStripeCallback(String stripeSessionId) {
        try {
            PaymentResponse stripeResponse = stripeService.verifyPayment(stripeSessionId);

            if (stripeResponse.getSuccess()) {
                // Tìm payment bằng stripeSessionId
                Payment payment = paymentRepository.findByStripeSessionId(stripeSessionId)
                        .orElseThrow(() -> new ErrorException(ErrorCode.PAYMENT_NOT_FOUND));

                // Cập nhật status
                payment.setStatus(PaymentStatus.SUCCESS);
                paymentRepository.save(payment);

                // Cập nhật order status
                Order order = orderRepository.findById(payment.getOrderId())
                        .orElseThrow(() -> new ErrorException(ErrorCode.ORDER_NOT_FOUND));
                order.setStatus(OrderStatus.PAID); // Cần thêm status PAID vào OrderStatus enum
                orderRepository.save(order);

                PaymentResponse response = paymentMapper.mapperToPaymentResponse(payment);
                response.setSuccess(true);
                response.setOrderNumber(order.getOrderNumber());
                response.setMessage("Thanh toán thành công");

                return response;
            }

            return stripeResponse;

        } catch (Exception e) {
            return PaymentResponse.builder()
                    .success(false)
                    .message("Lỗi xử lý callback: " + e.getMessage())
                    .build();
        }
    }
}
