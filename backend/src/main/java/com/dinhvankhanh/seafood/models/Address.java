package com.dinhvankhanh.seafood.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "addresses")
public class Address {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String userId;

    private String address;

    private Boolean isDefault;

    private String name;

    private String phoneAddress;
}
