package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.CreateLivestreamRequest;
import com.dinhvankhanh.seafood.dtos.requests.UpdateLivestreamRequest;
import com.dinhvankhanh.seafood.dtos.responses.LivestreamResponse;
import com.dinhvankhanh.seafood.enums.LivestreamStatus;
import com.dinhvankhanh.seafood.enums.UserRole;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.LivestreamMapper;
import com.dinhvankhanh.seafood.models.Livestream;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.ChatMessageRepository;
import com.dinhvankhanh.seafood.repositories.LivestreamRepository;
import com.dinhvankhanh.seafood.services.LivestreamService;
import com.dinhvankhanh.seafood.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LivestreamServiceImpl implements LivestreamService {

    private final LivestreamRepository livestreamRepository;

    private final ChatMessageRepository chatMessageRepository;

    private final UserService userService;

    private final LivestreamMapper livestreamMapper;

    @Override
    public List<LivestreamResponse> getLivestreams(LivestreamStatus status) {

        List<Livestream> livestreams;

        if (status != null) {
            livestreams = livestreamRepository.findByStatus(status);
        }else{
            livestreams = livestreamRepository.findAll();
        }

        return livestreams.stream()
                .map(livestream -> {
                    return livestreamMapper.mapperToLivestreamResponse(livestream);
                })
                .collect(Collectors.toList());

    }

    @Override
    public LivestreamResponse getLivestreamById(String id) {
        Livestream livestream = livestreamRepository.findById(id)
                .orElseThrow(()-> new ErrorException(ErrorCode.LIVESTREAM_NOT_FOUND));
        return livestreamMapper.mapperToLivestreamResponse(livestream);
    }

    @Override
    public LivestreamResponse createLivestream(CreateLivestreamRequest createLivestreamRequest) {
        User user = userService.getUserLogin();
        if (!UserRole.ADMIN.equals(user.getRole())) {
            throw new ErrorException(ErrorCode.FORBIDDEN, "Chỉ ADMIN mới có quyền xem tất cả đơn hàng");
        }

        Livestream livestream = Livestream.builder()
                .title(createLivestreamRequest.getTitle())
                .description(createLivestreamRequest.getDescription())
                .startTime(createLivestreamRequest.getStartTime())
                .endTime(createLivestreamRequest.getEndTime())
                .userId(user.getId())
                .status(LivestreamStatus.SCHEDULED)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        livestreamRepository.save(livestream);
        return livestreamMapper.mapperToLivestreamResponse(livestream);
    }

    @Override
    public LivestreamResponse updateLivestream(String id, UpdateLivestreamRequest updateLivestreamRequest) {
        Livestream livestream = livestreamRepository.findById(id)
                .orElseThrow(() -> new ErrorException(ErrorCode.LIVESTREAM_NOT_FOUND));

        if (updateLivestreamRequest.getTitle() != null) {
            livestream.setTitle(updateLivestreamRequest.getTitle());
        }
        if (updateLivestreamRequest.getDescription() != null) {
            livestream.setDescription(updateLivestreamRequest.getDescription());
        }
        if (updateLivestreamRequest.getStartTime() != null) {
            livestream.setStartTime(updateLivestreamRequest.getStartTime());
        }
        if (updateLivestreamRequest.getEndTime() != null) {
            livestream.setEndTime(updateLivestreamRequest.getEndTime());
        }
        if (updateLivestreamRequest.getStatus() != null) {
            livestream.setStatus(updateLivestreamRequest.getStatus());
        }

        livestreamRepository.save(livestream);

        return livestreamMapper.mapperToLivestreamResponse(livestream);
    }

    @Override
    public void deleteLivestream(String id) {
        if(!livestreamRepository.existsById(id)){
            throw new ErrorException(ErrorCode.LIVESTREAM_NOT_FOUND);
        }
        livestreamRepository.deleteById(id);
    }

    @Override
    @Scheduled(fixedRate = 60000)
    public void updateLivestreamStatuses() {
        LocalDateTime now = LocalDateTime.now();

        // Update SCHEDULED to ONGOING
        List<Livestream> scheduledToStart = livestreamRepository
                .findByStatusAndStartTimeBefore(LivestreamStatus.SCHEDULED, now);
        scheduledToStart.forEach(stream -> {
            stream.setStatus(LivestreamStatus.ONGOING);
            livestreamRepository.save(stream);
        });

        // Update ONGOING to ENDED
        List<Livestream> ongoingToEnd = livestreamRepository
                .findByStatusAndStartTimeBefore(LivestreamStatus.ONGOING, now);
        ongoingToEnd.forEach(stream -> {
            if (stream.getEndTime() != null && stream.getEndTime().isBefore(now)) {
                stream.setStatus(LivestreamStatus.ENDED);
                livestreamRepository.save(stream);
            }
        });
    }
}
