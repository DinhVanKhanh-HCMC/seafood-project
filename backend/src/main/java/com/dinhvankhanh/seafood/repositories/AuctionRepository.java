package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.enums.AuctionStatus;
import com.dinhvankhanh.seafood.models.Auction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends MongoRepository<Auction,String> {
    List<Auction> findByStatusOrderByCreatedAtDesc(AuctionStatus status);

    List<Auction> findByEndTimeBeforeAndStatus(LocalDateTime endTime, AuctionStatus status);

    List<Auction> findByStartTimeBeforeAndStatus(LocalDateTime now, AuctionStatus status);


    Optional<Auction> findByProductIdAndStatus(String productId, AuctionStatus status);

    @Query("{ 'status': 'ACTIVE', 'endTime': { $gt: ?0 } }")
    List<Auction> findActiveAuctions(LocalDateTime currentTime);

    List<Auction> findByCreatedByOrderByCreatedAtDesc(String createdBy);
}
