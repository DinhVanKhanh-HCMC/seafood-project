package com.dinhvankhanh.seafood.models;

import com.dinhvankhanh.seafood.enums.AuctionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "auctions")
public class Auction {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String productId;
    private String productName;
    private String productImage;

    private BigDecimal startPrice;
    private BigDecimal currentPrice;
    private BigDecimal bidStep; // Bước giá

    private String createdBy; // User ID của người tạo auction
    private String createdByName;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Builder.Default
    private AuctionStatus status = AuctionStatus.PENDING;

    private String winnerId; // User ID của người thắng
    private String winnerName;

    @Builder.Default
    private List<Bid> bids = new ArrayList<>();

    @Builder.Default
    private Integer participantCount = 0;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}

