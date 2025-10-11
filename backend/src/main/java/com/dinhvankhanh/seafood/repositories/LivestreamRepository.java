package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.enums.LivestreamStatus;
import com.dinhvankhanh.seafood.models.Livestream;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LivestreamRepository extends MongoRepository<Livestream, String> {
    List<Livestream> findByStatus(LivestreamStatus status);
    List<Livestream> findByUserId(String userId);
    List<Livestream> findByStatusAndStartTimeBefore(LivestreamStatus status, LocalDateTime time);
}
