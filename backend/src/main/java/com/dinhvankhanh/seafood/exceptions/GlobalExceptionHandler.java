package com.dinhvankhanh.seafood.exceptions;

import com.dinhvankhanh.seafood.dtos.responses.ApiResource;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Bắt lỗi khi @Valid thất bại
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResource<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return ApiResource.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .error(new ApiResource.ErrorResource(
                        HttpStatus.BAD_REQUEST.value(),
                        "Validation failed",
                        errorMessage
                ))
                .build();
    }

    // Bắt lỗi khi @RequestParam/@PathVariable invalid
    @ExceptionHandler(ConstraintViolationException.class)
    public ApiResource<?> handleConstraintViolationException(ConstraintViolationException ex) {
        String errorMessage = ex.getConstraintViolations()
                .stream()
                .map(err -> err.getPropertyPath() + ": " + err.getMessage())
                .collect(Collectors.joining(", "));

        return ApiResource.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .error(new ApiResource.ErrorResource(
                        HttpStatus.BAD_REQUEST.value(),
                        "Constraint violation",
                        errorMessage
                ))
                .build();
    }
    // ❗ Thêm handler cho RuntimeException
    @ExceptionHandler(RuntimeException.class)
    public ApiResource<?> handleRuntimeException(RuntimeException ex) {
        return ApiResource.builder()
                .code(500)
                .error(new ApiResource.ErrorResource(500, "Lỗi hệ thống", ex.getMessage()))
                .build();
    }

    // khi vượt quá kích thước file
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ApiResource<?> handleMaxSizeException(MaxUploadSizeExceededException ex) {
        return ApiResource.builder()
                .code(HttpStatus.PAYLOAD_TOO_LARGE.value())
                .error(new ApiResource.ErrorResource(
                        HttpStatus.PAYLOAD_TOO_LARGE.value(),
                        "File quá lớn",
                        "Kích thước file vượt quá giới hạn cho phép!"
                ))
                .build();
    }

}
