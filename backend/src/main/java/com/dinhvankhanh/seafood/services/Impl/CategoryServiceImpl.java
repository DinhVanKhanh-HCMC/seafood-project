package com.dinhvankhanh.seafood.services.Impl;

import com.dinhvankhanh.seafood.dtos.requests.CategoryRequest;
import com.dinhvankhanh.seafood.dtos.responses.CategoryResponse;
import com.dinhvankhanh.seafood.dtos.responses.UserResponse;
import com.dinhvankhanh.seafood.exception.ErrorCode;
import com.dinhvankhanh.seafood.exception.ErrorException;
import com.dinhvankhanh.seafood.mappers.CategoryMapper;
import com.dinhvankhanh.seafood.models.Category;
import com.dinhvankhanh.seafood.repositories.CategoryRepository;
import com.dinhvankhanh.seafood.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;


    @Override
    public CategoryResponse addCategory(CategoryRequest categoryRequest) {
        boolean existName = categoryRepository.existsByName(categoryRequest.getName());
        if(existName){
            throw new ErrorException(ErrorCode.CATEGORY_NAME_EXISTS);
        }
        Category category = Category.builder()
                .name(categoryRequest.getName())
                .description(categoryRequest.getDescription())
                .build();
        categoryRepository.save(category);

        return categoryMapper.mapperToCategoryResponse(category);
    }

    @Override
    public List<CategoryResponse> getAllCategory() {
        List<Category> listCategory = categoryRepository.findAll();
        return listCategory.stream()
                .map(category -> {
                    return categoryMapper.mapperToCategoryResponse(category);
                })
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse updateCategory(String id,CategoryRequest categoryRequest) {
        if(!categoryRepository.existsById(id)){
            throw new ErrorException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        Category category = Category.builder()
                .name(categoryRequest.getName())
                .description(categoryRequest.getDescription())
                .build();
        categoryRepository.save(category);
        return categoryMapper.mapperToCategoryResponse(category);
    }

    @Override
    public void deleteCategory(String id) {
        if(!categoryRepository.existsById(id)){
            throw new ErrorException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        categoryRepository.deleteById(id);
    }
}
