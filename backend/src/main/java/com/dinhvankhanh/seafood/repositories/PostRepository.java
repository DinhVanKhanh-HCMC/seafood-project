package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post,String> {
}
