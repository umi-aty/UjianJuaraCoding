package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.juaracoding.serviceapi.entity.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Long>{

	List<Categories> findByCategoryName(String categoryName);
	
}
