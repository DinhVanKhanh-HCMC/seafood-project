package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.AuctionRequest;
import com.dinhvankhanh.seafood.dtos.requests.BidRequest;
import com.dinhvankhanh.seafood.dtos.responses.AuctionResponse;
import com.dinhvankhanh.seafood.services.AuctionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {
    @Autowired
    private AuctionService auctionService;

    @PostMapping("/create")
    public ApiResource<AuctionResponse> createAuction(@RequestBody @Valid AuctionRequest auctionRequest){
        AuctionResponse response = auctionService.createAuction(auctionRequest);
        return ApiResource.ok(response,"Tạo phiên đấu giá thành công");
    }

    @PostMapping("/start/{id}")
    public ApiResource<AuctionResponse> startAuction(@PathVariable String id){
        AuctionResponse response = auctionService.startAuction(id);
        return ApiResource.ok(response,"Bắt đầu phiên đấu giá thành công");
    }

    @PostMapping("/bid/{id}")
    public ApiResource<AuctionResponse> placeBid(@PathVariable String id, @RequestBody @Valid BidRequest request){
        AuctionResponse response = auctionService.placeBid(id,request);
        return ApiResource.ok(response,"đấu giá thành công");
    }

    @PostMapping("/end/{id}")
    public ApiResource<AuctionResponse> endAuction(@PathVariable String id){
        AuctionResponse response = auctionService.endAuction(id);
        return ApiResource.ok(response,"Kết thúc phiên đấu giá thành công");
    }

    @GetMapping("/active")
    public ApiResource<List<AuctionResponse>> getActiveAuctions() {
        List<AuctionResponse> response = auctionService.getActiveAuctions();
        return ApiResource.ok(response, "Lấy danh sách đấu giá đang diễn ra thành công");
    }

    @GetMapping
    public ApiResource<List<AuctionResponse>> getAllAuctions() {
        List<AuctionResponse> response = auctionService.getAllAuctions();
        return ApiResource.ok(response, "Lấy tất cả phiên đấu giá thành công");
    }

    @GetMapping("/{id}")
    public ApiResource<AuctionResponse> getAuctionById(@PathVariable String id) {
        AuctionResponse response = auctionService.getAuctionById(id);
        return ApiResource.ok(response, "Lấy phiên đấu giá theo thành công");
    }


}
