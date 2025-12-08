package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.AuctionRequest;
import com.dinhvankhanh.seafood.dtos.requests.BidRequest;
import com.dinhvankhanh.seafood.dtos.responses.AuctionResponse;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.enums.AuctionStatus;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.AuctionMapper;
import com.dinhvankhanh.seafood.mappers.UserMapper;
import com.dinhvankhanh.seafood.models.Auction;
import com.dinhvankhanh.seafood.models.Bid;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.AuctionRepository;
import com.dinhvankhanh.seafood.repositories.ProductRepository;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import com.dinhvankhanh.seafood.services.AuctionService;
import com.dinhvankhanh.seafood.services.ProductService;
import com.dinhvankhanh.seafood.services.UserService;
import com.dinhvankhanh.seafood.websocket.AuctionWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final AuctionMapper auctionMapper;

    private final UserService userService;

    @Autowired
    @Lazy
    private AuctionWebSocketHandler auctionWebSocketHandler;

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

        LocalDateTime now = LocalDateTime.now();

        // VALIDATE THỜI GIAN - cho phép startTime là thời gian hiện tại hoặc tương lai
        if (request.getStartTime().isBefore(now)) {
            throw new ErrorException(ErrorCode.INVALID_START_TIME);
        }

        // End time phải sau start time ít nhất 1 phút
        if (!request.getEndTime().isAfter(request.getStartTime().plusMinutes(1))) {
            throw new ErrorException(ErrorCode.INVALID_END_TIME);
        }

        // Create auction entity
        Auction auction = Auction.builder()
                .productId(request.getProductId())
                .productName(product.getName())
                .productImage(product.getImages() != null && !product.getImages().isEmpty()
                        ? product.getImages().get(0) : null)
                .startPrice(request.getStartPrice())
                .currentPrice(request.getStartPrice())
                .bidStep(request.getBidStep())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .build();

        // Kiểm tra nếu startTime là trong vòng 1 phút tới thì set ACTIVE luôn
        // Điều này đảm bảo auction sẽ bắt đầu ngay lập tức
        if (request.getStartTime().isBefore(now.plusMinutes(1))) {
            auction.setStatus(AuctionStatus.ACTIVE);

        } else {
            auction.setStatus(AuctionStatus.PENDING);
            System.out.println("⏰ Auction created as PENDING, will start at: " + request.getStartTime());
        }

        Auction savedAuction = auctionRepository.save(auction);

        if (savedAuction.getStatus() == AuctionStatus.ACTIVE) {
            savedAuction.setStartTime(LocalDateTime.now());
            savedAuction = auctionRepository.save(savedAuction);
            auctionWebSocketHandler.broadcastAuctionStarted(savedAuction);
        }

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
            throw new ErrorException(ErrorCode.BAD_REQUEST, "Phiên đấu giá chưa diễn ra");
        }

        // Validate time
        if (auction.getEndTime().isBefore(LocalDateTime.now())) {
            throw new ErrorException(ErrorCode.BAD_REQUEST, "Phiên đấu giá đã kết thúc");
        }

        BigDecimal currentPrice = auction.getCurrentPrice();
        BigDecimal bidStep = auction.getBidStep();
        BigDecimal bidAmount = request.getAmount();

        // Validate bid amount >= currentPrice + bidStep
        BigDecimal minimumBid = currentPrice.add(bidStep);
        if (bidAmount.compareTo(minimumBid) < 0) {
            throw new ErrorException(ErrorCode.BAD_REQUEST, "Số tiền đấu giá ít nhất là " + minimumBid);
        }

        // ✅ Validate bid amount phải chia hết cho bước giá
        BigDecimal difference = bidAmount.subtract(currentPrice);
        BigDecimal[] divisionResult = difference.divideAndRemainder(bidStep);
        if (divisionResult[1].compareTo(BigDecimal.ZERO) != 0) {
            throw new ErrorException(ErrorCode.BAD_REQUEST,
                    "Giá đặt phải chia hết cho bước giá " + bidStep);
        }

        // Create new bid
        Bid bid = Bid.builder()
                .userId(request.getUserId())
                .userName(request.getUserName())
                .amount(bidAmount)
                .bidTime(LocalDateTime.now())
                .build();

        // Update auction
        auction.getBids().add(bid);
        auction.setCurrentPrice(bidAmount);
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
    public List<AuctionResponse> getMyAuctions() {
        User user = userService.getUserLogin();

        return auctionRepository.findAll()
                .stream()
                .filter(auction -> {
                    // Kiểm tra xem user có tham gia đấu giá trong auction này không
                    return auction.getBids()
                            .stream()
                            .anyMatch(bid -> bid.getUserId().equals(user.getId()));
                })
                .map(auctionMapper::mapperToAuctionResponse)
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
    @Scheduled(fixedRate = 30000) // Chạy mỗi 30 giây để chính xác hơn
    public void startScheduledAuctions() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("⏰ Checking for scheduled auctions to start at: " + now);

        // Tìm tất cả các auction có startTime <= now và status là PENDING
        List<Auction> pendingAuctions = auctionRepository.findByStartTimeLessThanEqualAndStatus(now, AuctionStatus.PENDING);

        System.out.println("📋 Found " + pendingAuctions.size() + " auctions to start");

        for (Auction auction : pendingAuctions) {
            try {
                System.out.println("🚀 Starting auction: " + auction.getId() +
                        ", scheduled start: " + auction.getStartTime());

                auction.setStatus(AuctionStatus.ACTIVE);
                // Cập nhật startTime thành thời gian thực tế khi bắt đầu
                auction.setStartTime(now);
                auctionRepository.save(auction);

                // Broadcast sang frontend
                auctionWebSocketHandler.broadcastAuctionStarted(auction);

                System.out.println("✅ Auto-started auction: " + auction.getId());
            } catch (Exception e) {
                System.out.println("❌ Error auto-starting auction " + auction.getId() + ": " + e.getMessage());
                e.printStackTrace();
            }
        }

        if (pendingAuctions.isEmpty()) {
            System.out.println("ℹ️ No pending auctions to start");
        }
    }

    @Override
    public UserResponse getAuctionWinner(String id) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ErrorException(ErrorCode.AUCTION_NOT_FOUND));
        if(!AuctionStatus.COMPLETED.equals(auction.getStatus())){
            throw new ErrorException(ErrorCode.BAD_REQUEST, "Phiên đấu giá chưa kết thúc");
        }

        User user = userRepository.findById(auction.getWinnerId())
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));

        return userMapper.mapToUserResponse(user);
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
