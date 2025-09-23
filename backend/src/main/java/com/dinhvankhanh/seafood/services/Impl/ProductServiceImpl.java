package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.AddProductRequest;
import com.dinhvankhanh.seafood.dtos.requests.UpdateProductRequest;
import com.dinhvankhanh.seafood.dtos.responses.ProductResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.ProductMapper;
import com.dinhvankhanh.seafood.models.Category;
import com.dinhvankhanh.seafood.models.Product;
import com.dinhvankhanh.seafood.repositories.CategoryRepository;
import com.dinhvankhanh.seafood.repositories.ProductRepository;
import com.dinhvankhanh.seafood.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final CategoryRepository categoryRepository;

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private final S3Service s3Service;

    @Override
    public ProductResponse addProduct(AddProductRequest addProductRequest, List<MultipartFile> images) {
        if (!categoryRepository.existsById(addProductRequest.getCategoryId())) {
            throw new ErrorException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        List<String> imageUrls = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    String imageUrl = s3Service.saveImageToS3(file); // gọi service upload S3
                    imageUrls.add(imageUrl); // lưu lại link public
                }
            }
        }

        Product product = Product.builder()
                .name(addProductRequest.getName())
                .description(addProductRequest.getDescription())
                .price(addProductRequest.getPrice())
                .inStock(addProductRequest.isInStock())
                .categoryId(addProductRequest.getCategoryId())
                .images(imageUrls)
                .build();

        productRepository.save(product);
        return productMapper.mapperToProductResponse(product);
    }

    @Override
    public List<ProductResponse> getAllProduct() {
        List<Product> listProduct = productRepository.findAll();
        return listProduct.stream()
                .map(product -> {
                    return productMapper.mapperToProductResponse(product);
                })
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse updateProduct(String id, UpdateProductRequest updateProductRequest, List<MultipartFile> images) {
        if (!categoryRepository.existsById(updateProductRequest.getCategoryId())) {
            throw new ErrorException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setName(updateProductRequest.getName());
        product.setDescription(updateProductRequest.getDescription());
        product.setPrice(updateProductRequest.getPrice());
        product.setInStock(updateProductRequest.isInStock());
        product.setOrigin(updateProductRequest.getOrigin());
        product.setCategoryId(updateProductRequest.getCategoryId());
        product.setUpdatedAt(LocalDateTime.now());

        List<String> finalImagePaths = new ArrayList<>();

        // Giữ lại ảnh cũ
        if (updateProductRequest.getOldImages() != null) {
            finalImagePaths.addAll(updateProductRequest.getOldImages());
        }

        if (images != null && !images.isEmpty()) {
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    String imageUrl = s3Service.saveImageToS3(file); // gọi service upload S3
                    finalImagePaths.add(imageUrl); // lưu lại link public
                }
            }
        }

        product.setImages(finalImagePaths);
        productRepository.save(product);
        return productMapper.mapperToProductResponse(product);


    }

    @Override
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ErrorException(ErrorCode.PRODUCT_NOT_FOUND));

        return productMapper.mapperToProductResponse(product);
    }

    @Override
    public void deleteProduct(String id) {
        if(!productRepository.existsById(id)){
            throw new ErrorException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        productRepository.deleteById(id);
    }


}
