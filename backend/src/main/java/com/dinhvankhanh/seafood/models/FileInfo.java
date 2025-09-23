package com.dinhvankhanh.seafood.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileInfo {
    private String originalFileName;
    private String s3Key;
    private String s3Url;
    private long fileSize;
    private String fileType;
    private LocalDateTime uploadDate;
}
