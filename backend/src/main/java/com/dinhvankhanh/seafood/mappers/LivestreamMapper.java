package com.dinhvankhanh.seafood.mappers;


import com.dinhvankhanh.seafood.dtos.responses.LivestreamResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.models.Livestream;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LivestreamMapper {
    @Autowired
    private UserRepository userRepository;

    public LivestreamResponse mapperToLivestreamResponse(Livestream livestream){
        User user = userRepository.findById(livestream.getUserId())
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));

        return LivestreamResponse.builder()
                .id(livestream.getId())
                .title(livestream.getTitle())
                .status(livestream.getStatus())
                .user(user.getFullName())
                .description(livestream.getDescription())
                .startTime(livestream.getStartTime())
                .endTime(livestream.getEndTime())
                .createdAt(livestream.getCreatedAt())
                .updatedAt(livestream.getUpdatedAt())
                .build();


    }
}
