package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.AddProductRequest;
import com.dinhvankhanh.seafood.dtos.requests.UpdateProductRequest;
import com.dinhvankhanh.seafood.dtos.responses.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    public ProductResponse addProduct(AddProductRequest addProductRequest, List<MultipartFile> images);

    public List<ProductResponse> getAllProduct();

    public ProductResponse updateProduct(String id, UpdateProductRequest updateProductRequest, List<MultipartFile> images);

    public ProductResponse getProductById(String id);

    public void deleteProduct(String id);
}
