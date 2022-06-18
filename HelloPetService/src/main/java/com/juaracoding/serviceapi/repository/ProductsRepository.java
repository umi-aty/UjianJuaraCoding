package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.juaracoding.serviceapi.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Long>{
	
	
	List<Products> findByProductName(String productName);
	
	@Query (value = "select * from products where categories_id =:id", nativeQuery = true)
	List<Products> findAllProductByCategory(@Param("id") Long id);

	@Query (value = "delete p.* from products p inner join product_galleries pg on p.id = pg.products_id"
			+ "where p.id =:id", nativeQuery = true)
	public String deleteProductNew(@Param("id") Long id);
	
//	@Query (value = "SELECT product_galleries.image from product_galleries"
//			+ "inner join products on product_galleries.products_id = products.id "
//			+ "where products.id =:id order by products asc limit 1", nativeQuery = true)
//	Products getImageProduct(@Param("id") Long id);

//	Products findFirstByOrderByProductGalleriesAsc();
}
