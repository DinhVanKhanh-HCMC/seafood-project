package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.AuctionRequest;
import com.dinhvankhanh.seafood.dtos.requests.BidRequest;
import com.dinhvankhanh.seafood.dtos.responses.AuctionResponse;
import com.dinhvankhanh.seafood.enums.AuctionStatus;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.AuctionMapper;
import com.dinhvankhanh.seafood.models.Auction;
import com.dinhvankhanh.seafood.models.Bid;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.repositories.AuctionRepository;
import com.dinhvankhanh.seafood.repositories.ProductRepository;
import com.dinhvankhanh.seafood.services.AuctionService;
import com.dinhvankhanh.seafood.services.ProductService;
import com.dinhvankhanh.seafood.websocket.AuctionWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService {
    private final AuctionRepository auctionRepository;
    private final ProductRepository productRepository;
    private final AuctionWebSocketHandler auctionWebSocketHandler;

    private final AuctionMapper auctionMapper;

    @Override
    public AuctionResponse createAuction(AuctionRequest request) {
        // Validate product
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND));

        // Check if product is already in an active auction
        Optional<Auction> existingAuction = auctionRepository.findByProductIdAndStatus(
                request.getProductId(), AuctionStatus.ACTIVE);
        if (existingAuction.isPresent()) {
            throw new ErrorException(ErrorCode.PRODUCT_AUCTION_EXISTS);
        }

        // VALIDATE THỜI GIAN
        if (request.getStartTime().isBefore(LocalDateTime.now())) {
            throw new ErrorException(ErrorCode.INVALID_START_TIME);
        }
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new ErrorException(ErrorCode.INVALID_END_TIME);
        }

        // Create auction entity - SET startTime từ request
        Auction auction = Auction.builder()
                .productId(request.getProductId())
                .productName(product.getName())
                .productImage(product.getImages() != null && !product.getImages().isEmpty()
                        ? product.getImages().get(0) : null)
                .startPrice(request.getStartPrice())
                .currentPrice(request.getStartPrice())
                .bidStep(request.getBidStep())
                .startTime(request.getStartTime()) // QUAN TRỌNG: SET startTime
                .endTime(request.getEndTime())
                .status(AuctionStatus.PENDING)
                .build();

        Auction savedAuction = auctionRepository.save(auction);

        // Broadcast new auction
        auctionWebSocketHandler.broadcastAuctionCreated(savedAuction);

        return auctionMapper.mapperToAuctionResponse(savedAuction);
    }

    @Override
    public AuctionResponse startAuction(String auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new ErrorException(ErrorCode.AUCTION_NOT_FOUND));

        if (auction.getStatus() != AuctionStatus.PENDING) {
            throw new ErrorException(ErrorCode.AUCTION_CANNOT_START);
        }

        auction.setStatus(AuctionStatus.ACTIVE);
        auction.setStartTime(LocalDateTime.now());
        Auction updatedAuction = auctionRepository.save(auction);

        // Broadcast auction started
        auctionWebSocketHandler.broadcastAuctionStarted(updatedAuction);

        return auctionMapper.mapperToAuctionResponse(updatedAuction);
    }

    @Override
    public AuctionResponse placeBid(String auctionId, BidRequest request) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new ErrorException(ErrorCode.AUCTION_NOT_FOUND));

        // Validate auction status
        if (auction.getStatus() != AuctionStatus.ACTIVE) {
            throw new ErrorException(ErrorCode.BAD_REQUEST,"Phiên đấu giá chưa diễn ra");
        }

        // Validate time
        if (auction.getEndTime().isBefore(LocalDateTime.now())) {
            throw new ErrorException(ErrorCode.BAD_REQUEST,"Phiên đấu giá đã kết thúc");
        }

        // Validate bid amount
        BigDecimal minimumBid = auction.getCurrentPrice().add(auction.getBidStep());
        if (request.getAmount().compareTo(minimumBid) < 0) {
            throw new ErrorException(ErrorCode.BAD_REQUEST,"Số tiền đấu giá ít nhất là " + minimumBid);
        }

        // Create new bid
        Bid bid = Bid.builder()
                .userId(request.getUserId())
                .userName(request.getUserName())
                .amount(request.getAmount())
                .build();

        // Update auction
        auction.getBids().add(bid);
        auction.setCurrentPrice(request.getAmount());
        auction.setWinnerId(request.getUserId());
        auction.setWinnerName(request.getUserName());
        auction.setUpdatedAt(LocalDateTime.now());

        // Update participant count if this is user's first bid
        if (auction.getBids().stream().noneMatch(b -> b.getUserId().equals(request.getUserId()))) {
            auction.setParticipantCount(auction.getParticipantCount() + 1);
        }

        Auction updatedAuction = auctionRepository.save(auction);

        // Broadcast new bid
        auctionWebSocketHandler.broadcastNewBid(updatedAuction, bid);

        return auctionMapper.mapperToAuctionResponse(updatedAuction);
    }

    @Override
    public AuctionResponse endAuction(String auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new ErrorException(ErrorCode.AUCTION_NOT_FOUND));

        auction.setStatus(AuctionStatus.COMPLETED);
        auction.setUpdatedAt(LocalDateTime.now());
        Auction updatedAuction = auctionRepository.save(auction);

        // Broadcast auction ended
        auctionWebSocketHandler.broadcastAuctionEnded(updatedAuction);

        return auctionMapper.mapperToAuctionResponse(updatedAuction);
    }

    @Override
    public List<AuctionResponse> getActiveAuctions() {
        return auctionRepository.findActiveAuctions(LocalDateTime.now())
                .stream()
                .map(auction -> {
                    return auctionMapper.mapperToAuctionResponse(auction);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<AuctionResponse> getAllAuctions() {
        return auctionRepository.findAll()
                .stream()
                .map(auction -> {
                    return auctionMapper.mapperToAuctionResponse(auction);
                })
                .collect(Collectors.toList());
    }

    @Override
    public AuctionResponse getAuctionById(String id) {
        return auctionRepository.findById(id)
                .map(auction -> {
                    return auctionMapper.mapperToAuctionResponse(auction);
                })
                .orElseThrow(() -> new ErrorException(ErrorCode.AUCTION_NOT_FOUND));
    }

    @Override
    @Scheduled(fixedRate = 60000) // Run every minute
    public void endExpiredAuctions() {
        LocalDateTime now = LocalDateTime.now();
        List<Auction> expiredAuctions = auctionRepository.findByEndTimeBeforeAndStatus(now, AuctionStatus.ACTIVE);

        for (Auction auction : expiredAuctions) {
            try {
                endAuction(auction.getId());
                System.out.println("✅ Auto-ended expired auction: " + auction.getId());
            } catch (Exception e) {
                System.out.println("❌ Error auto-ending auction " + auction.getId() + ": " + e.getMessage());
            }
        }
    }
}
