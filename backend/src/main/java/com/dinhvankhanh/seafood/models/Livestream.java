package com.dinhvankhanh.seafood.models;

import com.dinhvankhanh.seafood.enums.LivestreamStatus;
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
@Document(collection = "livestreams")
public class Livestream {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String title;
    private String description;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private LivestreamStatus status;

    private String userId; // Admin user who creates the livestream


    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
