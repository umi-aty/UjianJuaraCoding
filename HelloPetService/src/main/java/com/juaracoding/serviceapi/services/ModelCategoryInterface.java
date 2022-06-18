package com.juaracoding.serviceapi.services;

import java.util.List;

import com.juaracoding.serviceapi.entity.Categories;

public interface ModelCategoryInterface {

	List<Categories> getAllCategories();
	
	public Categories addCategory(Categories category);
	
	public void deleteCategory(long id);
	
	public Categories findByCategoryId(long id);

	public List<Categories> findByCategoryName(String categoryName);
}
