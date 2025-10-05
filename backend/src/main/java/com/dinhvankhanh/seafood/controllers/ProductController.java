package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.AddProductRequest;
import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.UpdateProductRequest;
import com.dinhvankhanh.seafood.dtos.responses.ProductResponse;
import com.dinhvankhanh.seafood.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ApiResource<ProductResponse> addProduct(@Valid @ModelAttribute AddProductRequest addProductRequest,@RequestPart(value = "images", required = false) List<MultipartFile> images){
        ProductResponse response = productService.addProduct(addProductRequest,images);
        return ApiResource.ok(response,"Thêm sản phẩm thành công");
    }

    @PostMapping("/update/{id}")
    public ApiResource<ProductResponse> updateProduct(@PathVariable String id,@Valid @ModelAttribute UpdateProductRequest updateProductRequest, @RequestPart(value = "images", required = false) List<MultipartFile> images){
        ProductResponse response = productService.updateProduct(id,updateProductRequest,images);
        return ApiResource.ok(response,"Thêm sản phẩm thành công");
    }

    @GetMapping
    public ApiResource<List<ProductResponse>> getALlProduct(){
        List<ProductResponse> responses = productService.getAllProduct();
        return ApiResource.ok(responses,"Lấy danh sách sản phẩm thành công");
    }

    @GetMapping("/category/{id}")
    public ApiResource<List<ProductResponse>> getProductByCategoryId(@PathVariable String id){
        List<ProductResponse> responses = productService.getProductByCategoryId(id);
        return ApiResource.ok(responses,"Lấy danh sách sản phẩm theo danh mục thành công");
    }

    @GetMapping("/{id}")
    public ApiResource<ProductResponse> getProductById(@PathVariable String id){
        ProductResponse response = productService.getProductById(id);
        return ApiResource.ok(response,"Lấy sản phẩm theo id thành công");
    }

    @PostMapping("/delete/{id}")
    public ApiResource<String> deleteProduct(@PathVariable String id){
        productService.deleteProduct(id);
        return ApiResource.ok("Xóa sản phẩm thành công","SUCCESS");
    }


}
