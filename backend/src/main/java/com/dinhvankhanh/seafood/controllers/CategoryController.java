package com.dinhvankhanh.seafood.controllers;

import com.dinhvankhanh.seafood.dtos.requests.ApiResource;
import com.dinhvankhanh.seafood.dtos.requests.CategoryRequest;
import com.dinhvankhanh.seafood.dtos.responses.CategoryResponse;
import com.dinhvankhanh.seafood.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ApiResource<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> response = categoryService.getAllCategory();
        return ApiResource.ok(response,"Lấy danh sách danh mục thành công");
    }

    @PostMapping("/update/{id}")
    public ApiResource<CategoryResponse> updateCategory(@PathVariable String id, @Valid @RequestBody CategoryRequest categoryRequest){
        CategoryResponse categoryResponse = categoryService.updateCategory(id,categoryRequest);
        return ApiResource.ok(categoryResponse,"Cập nhật danh mục thành công");
    }

    @PostMapping("/add")
    public ApiResource<CategoryResponse> addCategory(@Valid @RequestBody CategoryRequest categoryRequest){
        CategoryResponse categoryResponse = categoryService.addCategory(categoryRequest);
        return ApiResource.ok(categoryResponse,"thêm danh mục thành công");
    }

    @PostMapping("delete/{id}")
    public ApiResource<String> deleteCategory(@PathVariable String id){
        categoryService.deleteCategory(id);
        return ApiResource.ok("Xóa category"+id+" thành công","xóa thành công");
    }


}
