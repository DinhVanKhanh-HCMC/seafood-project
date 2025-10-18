package com.dinhvankhanh.seafood.controllers;


import com.dinhvankhanh.seafood.dtos.requests.AddAddressRequest;
import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.CategoryRequest;
import com.dinhvankhanh.seafood.dtos.requests.UpdateAddressRequest;
import com.dinhvankhanh.seafood.dtos.responses.AddressResponse;
import com.dinhvankhanh.seafood.dtos.responses.CategoryResponse;
import com.dinhvankhanh.seafood.services.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/add")
    public ApiResource<AddressResponse> addAddress(@Valid @RequestBody AddAddressRequest addAddressRequest){
        AddressResponse addressResponse = addressService.addAddress(addAddressRequest);
        return ApiResource.ok(addressResponse,"thêm địa chỉ thành công");
    }

    @PostMapping("/update/{id}")
    public ApiResource<AddressResponse> updateAddress(@PathVariable String id,@Valid @RequestBody UpdateAddressRequest updateAddressRequest){
        AddressResponse response = addressService.updateAddress(id, updateAddressRequest);
        return ApiResource.ok(response,"Cập nhật địa chỉ thành công");
    }

    @PostMapping("/change-default/{userId}")
    public ApiResource<String> changeDefaultAddress(@PathVariable String userId, String newDefaultAddressId){
        addressService.setDefaultAddress(userId, newDefaultAddressId);
        return ApiResource.ok("Thay đổi địa chỉ mặc định thành công","Thay đổi địa chỉ mặc định thành công");
    }

    @GetMapping("/{userId}")
    public ApiResource<List<AddressResponse>> getAddressByUserId(@PathVariable String userId){
        List<AddressResponse> listAddressOfUser = addressService.getAddressByUserId(userId);
        return ApiResource.ok(listAddressOfUser,"Lấy địa chỉ của user thành công");
    }

    @PostMapping("/delete/{id}")
    public ApiResource<String> deleteAddressById(@PathVariable String id){
        addressService.deleteAddress(id);
        return ApiResource.ok("Xoá địa chỉ thành công","Xoá địa chỉ thành công");
    }

}
