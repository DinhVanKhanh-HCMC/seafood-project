package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends MongoRepository<Address,String> {
    List<Address> findByUserId(String id);
    Optional<Address> findByUserIdAndIsDefaultTrue(String userId);
}
