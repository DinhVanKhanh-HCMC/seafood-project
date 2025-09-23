package com.dinhvankhanh.seafood.services;

import com.dinhvankhanh.seafood.dtos.requests.CategoryRequest;
import com.dinhvankhanh.seafood.dtos.responses.CategoryResponse;

import java.util.List;

public interface CategoryService {
    public CategoryResponse addCategory(CategoryRequest categoryRequest);
    public List<CategoryResponse> getAllCategory();
    public CategoryResponse updateCategory(String id,CategoryRequest categoryRequest);
    public void deleteCategory(String id);
}
