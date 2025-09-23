package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category,String> {
    boolean existsByName(String name);

    boolean existsById(String id);
}
