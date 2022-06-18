package com.juaracoding.serviceapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.serviceapi.entity.Categories;
import com.juaracoding.serviceapi.repository.CategoriesRepository;

@Service
public class ModelCategory implements ModelCategoryInterface{

	@Autowired
	CategoriesRepository categoriesRepository;
	
	@Override
	public List<Categories> getAllCategories() {
	
		return (List<Categories>) this.categoriesRepository.findAll();
	}

	@Override
	public Categories addCategory(Categories category) {
		
		return this.categoriesRepository.save(category);
	}

	@Override
	public void deleteCategory(long id) {
		this.categoriesRepository.deleteById(id);
		
	}

	@Override
	public Categories findByCategoryId(long id) {
		
		return this.categoriesRepository.findById(id).get();
	}

	@Override
	public List<Categories> findByCategoryName(String categoryName) {
		// TODO Auto-generated method stub
		return this.categoriesRepository.findByCategoryName(categoryName);
	}

	public Long count() {
		return categoriesRepository.count();
	}
	
}
