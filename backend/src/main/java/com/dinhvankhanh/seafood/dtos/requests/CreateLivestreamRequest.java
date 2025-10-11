package com.dinhvankhanh.seafood.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateLivestreamRequest {

    @NotBlank(message = "Tiêu đề không được để trống")
    private String title;

    private String description;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
}
