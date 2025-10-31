package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product,String> {
    boolean existsById(String id);

    List<Product> findByCategoryId(String cateId);

    List<Product> findByInAuctionTrue();
}
