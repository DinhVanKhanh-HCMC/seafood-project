package com.dinhvankhanh.seafood.mappers;

import com.dinhvankhanh.seafood.dtos.responses.AddressResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.models.Address;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    @Autowired
    private UserRepository userRepository;

    public AddressResponse mapperToAddressResponse(Address address){

        User user = userRepository.findById(address.getUserId())
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));

        return AddressResponse.builder()
                .id(address.getId())
                .user(user.getFullName())
                .address(address.getAddress())
                .isDefault(address.getIsDefault())
                .name(address.getName())
                .phoneAddress(address.getPhoneAddress())
                .build();
    }
}
