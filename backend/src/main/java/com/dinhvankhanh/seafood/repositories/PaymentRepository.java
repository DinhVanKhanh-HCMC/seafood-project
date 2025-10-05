package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment,String> {
    Optional<Payment> findByOrderId(String orderId);
}
