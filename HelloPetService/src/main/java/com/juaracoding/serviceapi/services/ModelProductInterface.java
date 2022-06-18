package com.juaracoding.serviceapi.services;

import java.util.List;

import com.juaracoding.serviceapi.entity.Products;

public interface ModelProductInterface {

	List<Products> getAllProducts();
	
	public Products addProduct(Products products);
	
	public void deleteProduct(String id);
	
	public Products cariProduct(String id);

}
