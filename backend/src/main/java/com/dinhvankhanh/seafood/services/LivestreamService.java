package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.CreateLivestreamRequest;
import com.dinhvankhanh.seafood.dtos.requests.UpdateLivestreamRequest;
import com.dinhvankhanh.seafood.dtos.responses.LivestreamResponse;
import com.dinhvankhanh.seafood.enums.LivestreamStatus;
import com.dinhvankhanh.seafood.models.Livestream;

import java.util.List;

public interface LivestreamService {
    public List<LivestreamResponse> getLivestreams(LivestreamStatus status);
    public LivestreamResponse getLivestreamById(String id);
    public LivestreamResponse createLivestream(CreateLivestreamRequest livestream);
    public LivestreamResponse updateLivestream(String id, UpdateLivestreamRequest updateLivestreamRequest);
    public void deleteLivestream(String id);
    public void updateLivestreamStatuses();
}
