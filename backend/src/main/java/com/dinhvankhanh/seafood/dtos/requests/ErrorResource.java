package com.dinhvankhanh.seafood.dtos.requests;

import lombok.*;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResource {
    private String message;
    private Map<String,String> errors;

}
