package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends MongoRepository<Cart,String> {
    public Optional<Cart> findByUserId(String id);
}
