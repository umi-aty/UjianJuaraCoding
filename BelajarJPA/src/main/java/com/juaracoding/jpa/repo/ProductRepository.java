package com.juaracoding.jpa.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.juaracoding.jpa.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	List<Product> findByName(String name);
	
	@Query(value="SELECT *FROM product WHERE quantity = ?1", nativeQuery=true)
	public List<Product> findByQuantity(int quantity);
	
	@Query(value = "SELECT *FROM product ORDER BY price desc limit 4", nativeQuery=true)
	public List<Product> findMax();

}
