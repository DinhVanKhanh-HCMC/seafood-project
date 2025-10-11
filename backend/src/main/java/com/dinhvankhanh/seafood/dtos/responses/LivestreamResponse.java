package com.dinhvankhanh.seafood.dtos.responses;

import com.dinhvankhanh.seafood.enums.LivestreamStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LivestreamResponse {
    private String id;

    private String title;
    private String description;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private LivestreamStatus status;

    private String user; // Admin user who creates the livestream



    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
