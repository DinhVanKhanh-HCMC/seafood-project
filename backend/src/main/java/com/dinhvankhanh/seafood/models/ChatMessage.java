package com.dinhvankhanh.seafood.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "livestream_chats")
public class ChatMessage {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String livestreamId;


    private String userId;

    private String message;

    private LocalDateTime timestamp;

    private String userName;
}
