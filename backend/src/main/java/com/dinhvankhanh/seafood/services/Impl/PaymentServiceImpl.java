package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.responses.PaymentResponse;
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

    private final PaymentMapper paymentMapper;

    @Override
    public PaymentResponse createPayment(String orderId, PaymentMethod method) {
        User user = userService.getUserLogin();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ErrorException(ErrorCode.ORDER_NOT_FOUND));

        // check nếu đã có payment cho order
        paymentRepository.findByOrderId(orderId).ifPresent(p -> {
            throw new ErrorException(ErrorCode.BAD_REQUEST, "Payment đã tồn tại trong đơn hàng này");
        });

        Payment payment = Payment.builder()
                .orderId(orderId)
                .amount(order.getTotalPrice())
                .method(method) // "COD" hoặc "BANK_TRANSFER"
                .status(PaymentStatus.PENDING)
                .build();

        paymentRepository.save(payment);
        return paymentMapper.mapperToPaymentResponse(payment);
    }

    @Override
    public PaymentResponse getPaymentByOrder(String orderId) {
        User user = userService.getUserLogin();
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ErrorException(ErrorCode.PAYMENT_NOT_FOUND));

        return paymentMapper.mapperToPaymentResponse(payment);
    }

    @Override
    public PaymentResponse updateStatus(String paymentId, PaymentStatus status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ErrorException(ErrorCode.PAYMENT_NOT_FOUND));

        // chỉ admin mới có quyền đổi status
        User user = userService.getUserLogin();
        if (!UserRole.ADMIN.equals(user.getRole())) {
            throw new ErrorException(ErrorCode.FORBIDDEN, "Chỉ ADMIN mới có thể chỉnh sửa trạng thái payment");
        }

        payment.setStatus(status); // SUCCESS hoặc FAILED
        paymentRepository.save(payment);
        return paymentMapper.mapperToPaymentResponse(payment);
    }
}
