package com.dinhvankhanh.seafood.repositories;

import com.dinhvankhanh.seafood.models.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByLivestreamIdOrderByTimestampAsc(String livestreamId);

    @Query("{ 'livestreamId': ?0 }")
    List<ChatMessage> findRecentMessages(String livestreamId, Pageable pageable);

    long countByLivestreamId(String livestreamId);
}
