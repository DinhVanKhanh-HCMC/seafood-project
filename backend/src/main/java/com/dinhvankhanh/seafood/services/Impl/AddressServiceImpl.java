package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.AddAddressRequest;
import com.dinhvankhanh.seafood.dtos.requests.UpdateAddressRequest;
import com.dinhvankhanh.seafood.dtos.responses.AddressResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.AddressMapper;
import com.dinhvankhanh.seafood.models.Address;
import com.dinhvankhanh.seafood.models.User;
import com.dinhvankhanh.seafood.repositories.AddressRepository;
import com.dinhvankhanh.seafood.repositories.UserRepository;
import com.dinhvankhanh.seafood.services.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final UserRepository userRepository;

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    @Override
    public AddressResponse addAddress(AddAddressRequest addAddressRequest) {
        User user = userRepository.findById(addAddressRequest.getUserId())
                .orElseThrow(() -> new ErrorException(ErrorCode.USER_NOT_FOUND));

        Address address = Address.builder()
                .userId(addAddressRequest.getUserId())
                .address(addAddressRequest.getAddress())
                .name(addAddressRequest.getName())
                .build();

        List<Address> existingAddresses = addressRepository.findByUserId(addAddressRequest.getUserId());

        // Xử lý logic isDefault
        if (existingAddresses.isEmpty()) {
            // Địa chỉ đầu tiên luôn là mặc định
            address.setIsDefault(true);
        } else if (addAddressRequest.getIsDefault() != null && addAddressRequest.getIsDefault()) {
            // Nếu set địa chỉ mới là mặc định, tìm và cập nhật địa chỉ mặc định hiện tại
            existingAddresses.stream()
                    .filter(Address::getIsDefault)
                    .findFirst()
                    .ifPresent(currentDefault -> {
                        currentDefault.setIsDefault(false);
                        addressRepository.save(currentDefault);
                    });
            address.setIsDefault(true);
        } else {
            address.setIsDefault(false);
        }

        // Xử lý số điện thoại
        if(addAddressRequest.getPhoneAddress() == null || addAddressRequest.getPhoneAddress().isBlank()){
            address.setPhoneAddress(user.getPhone());
        }else{
            address.setPhoneAddress(addAddressRequest.getPhoneAddress());
        }

        addressRepository.save(address);

        return addressMapper.mapperToAddressResponse(address);
    }

    @Override
    @Transactional
    public void setDefaultAddress(String userId, String newDefaultAddressId) {
        addressRepository.findByUserIdAndIsDefaultTrue(userId)
                .ifPresent(oldDefault -> {
                    oldDefault.setIsDefault(false);
                    addressRepository.save(oldDefault);
                });

        // Bước 2: đặt địa chỉ mới là mặc định
        Address newDefault = addressRepository.findById(newDefaultAddressId)
                .orElseThrow(() -> new ErrorException(ErrorCode.NOT_FOUND,"Không tìm thấy địa chỉ mới"));

        // đảm bảo địa chỉ thuộc cùng user
        if (!newDefault.getUserId().equals(userId)) {
            throw new ErrorException(ErrorCode.BAD_REQUEST,"Địa chỉ không thuộc về người dùng này");
        }

        newDefault.setIsDefault(true);
        addressRepository.save(newDefault);
    }

    @Override
    public List<AddressResponse> getAddressByUserId(String userId) {
        List<Address> listAddress = addressRepository.findByUserId(userId);

        return listAddress.stream()
                .map(address -> {
                    return addressMapper.mapperToAddressResponse(address);
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAddress(String id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ErrorException(ErrorCode.ADDRESS_NOT_FOUND));

        String userId = address.getUserId();
        List<Address> userAddresses = addressRepository.findByUserId(userId);

        // Kiểm tra nếu đây là địa chỉ cuối cùng
        if (userAddresses.size() == 1) {
            throw new ErrorException(ErrorCode.CANNOT_DELETE_LAST_ADDRESS);
        }

        // Nếu địa chỉ bị xóa là mặc định, chọn một địa chỉ khác làm mặc định
        if (address.getIsDefault()) {
            userAddresses.stream()
                    .filter(addr -> !addr.getId().equals(id))
                    .findFirst()
                    .ifPresent(newDefaultAddress -> {
                        newDefaultAddress.setIsDefault(true);
                        addressRepository.save(newDefaultAddress);
                    });
        }

        addressRepository.deleteById(id);
    }

    @Override
    public AddressResponse updateAddress(String addressId, UpdateAddressRequest updateAddressRequest) {
        // Tìm địa chỉ cần cập nhật
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ErrorException(ErrorCode.ADDRESS_NOT_FOUND));

        // Cập nhật các trường cơ bản
        address.setAddress(updateAddressRequest.getAddress());
        address.setName(updateAddressRequest.getName());
        address.setPhoneAddress(updateAddressRequest.getPhoneAddress());

        List<Address> userAddresses = addressRepository.findByUserId(address.getUserId());

        // Xử lý logic isDefault
        if (updateAddressRequest.getIsDefault() != null) {
            if (updateAddressRequest.getIsDefault()) {
                // Nếu set địa chỉ này là mặc định, tìm và cập nhật địa chỉ mặc định hiện tại
                userAddresses.stream()
                        .filter(addr -> addr.getIsDefault() && !addr.getId().equals(addressId))
                        .findFirst()
                        .ifPresent(currentDefault -> {
                            currentDefault.setIsDefault(false);
                            addressRepository.save(currentDefault);
                        });
                address.setIsDefault(true);
            } else {
                // Nếu bỏ chọn mặc định
                if (userAddresses.size() == 1) {
                    // Nếu chỉ còn 1 địa chỉ thì không cho phép bỏ mặc định
                    throw new ErrorException(ErrorCode.CANNOT_REMOVE_DEFAULT_ADDRESS);
                } else if (address.getIsDefault()) {
                    // Nếu đang là mặc định và có nhiều địa chỉ, set địa chỉ khác làm mặc định
                    userAddresses.stream()
                            .filter(addr -> !addr.getId().equals(addressId))
                            .findFirst()
                            .ifPresent(otherAddress -> {
                                otherAddress.setIsDefault(true);
                                addressRepository.save(otherAddress);
                            });
                    address.setIsDefault(false);
                }
            }
        }

        addressRepository.save(address);

        return addressMapper.mapperToAddressResponse(address);
    }
}
