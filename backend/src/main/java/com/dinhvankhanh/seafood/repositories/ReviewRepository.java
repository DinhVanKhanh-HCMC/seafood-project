package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends MongoRepository<Review,String> {
    int countByProductId(String id);

    Optional<List<Review>> findByProductId(String id);

    List<Review> findByProductIdOrderByCreatedAtDesc(String id);
}
