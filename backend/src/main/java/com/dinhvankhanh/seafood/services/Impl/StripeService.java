package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.models.Order;
import com.dinhvankhanh.seafood.repositories.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.dinhvankhanh.seafood.dtos.responses.PaymentResponse;
import com.dinhvankhanh.seafood.models.OrderProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StripeService {

    private final OrderRepository orderRepository;

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @Value("${stripe.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    public PaymentResponse createStripePaymentSession(String orderId, BigDecimal amount,
                                                      List<OrderProduct> items, String callbackUrl) {
        try {
            Stripe.apiKey = stripeSecretKey;

            List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

            // Thêm sản phẩm vào line items
            for (OrderProduct item : items) {
                long unitAmount = item.getPrice().longValue();

                SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("vnd")
                                        .setProductData(
                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                        .setName(item.getName())
                                                        .build()
                                        )
                                        .setUnitAmount(unitAmount)
                                        .build()
                        )
                        .setQuantity((long) item.getQuantity())
                        .build();
                lineItems.add(lineItem);
            }

            // Thêm phí vận chuyển (tùy chọn)
            if (amount.compareTo(BigDecimal.valueOf(500000)) < 0) {
                SessionCreateParams.LineItem shippingItem = SessionCreateParams.LineItem.builder()
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("vnd")
                                        .setProductData(
                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                        .setName("Phí vận chuyển")
                                                        .build()
                                        )
                                        .setUnitAmount(30000L)
                                        .build()
                        )
                        .setQuantity(1L)
                        .build();
                lineItems.add(shippingItem);
            }



            // 🔥 SỬA URL THÀNH /payment-success (trang React của bạn)
            SessionCreateParams params = SessionCreateParams.builder()
                    .addAllLineItem(lineItems)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(frontendUrl + "/seafood-project/payment-success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontendUrl + "/seafood-project/payment-canceled")
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .putMetadata("orderId", orderId)
                    .build();

            Session session = Session.create(params);

            return PaymentResponse.builder()
                    .success(true)
                    .sessionUrl(session.getUrl())
                    .stripeSessionId(session.getId())
                    .orderId(orderId)
                    .amount(amount)
                    .message("Tạo session thanh toán thành công")
                    .build();

        } catch (StripeException e) {
            return PaymentResponse.builder()
                    .success(false)
                    .message("Lỗi Stripe: " + e.getMessage())
                    .build();
        }
    }

    // Verify payment status từ Stripe
    public PaymentResponse verifyPayment(String stripeSessionId) {
        try {
            Stripe.apiKey = stripeSecretKey;
            Session session = Session.retrieve(stripeSessionId);

            String orderId = session.getMetadata().get("orderId");
            String paymentStatus = session.getPaymentStatus(); // "paid", "unpaid", "no_payment_required"

            PaymentResponse response = PaymentResponse.builder()
                    .stripeSessionId(stripeSessionId)
                    .orderId(orderId)
                    .success("paid".equals(paymentStatus))
                    .message("Trạng thái thanh toán: " + paymentStatus)
                    .build();

            return response;

        } catch (StripeException e) {
            return PaymentResponse.builder()
                    .success(false)
                    .message("Lỗi xác thực thanh toán: " + e.getMessage())
                    .build();
        }
    }
}
