package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.AddAddressRequest;
import com.dinhvankhanh.seafood.dtos.requests.UpdateAddressRequest;
import com.dinhvankhanh.seafood.dtos.responses.AddressResponse;

import java.util.List;

public interface AddressService {
    AddressResponse addAddress(AddAddressRequest addAddressRequest);

    void setDefaultAddress(String userId, String newDefaultAddressId);

    List<AddressResponse> getAddressByUserId(String userId);

    void deleteAddress(String id);

    AddressResponse updateAddress(String id, UpdateAddressRequest updateAddressRequest);
}
