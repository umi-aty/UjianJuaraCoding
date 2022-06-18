package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.juaracoding.serviceapi.entity.ProductGalleries;

public interface ProductGalleriesRepository extends JpaRepository<ProductGalleries, Long>{

	@Query (value = "select * from product_galleries where products_id =:id ", nativeQuery = true)
	List<ProductGalleries> findAllGalleryByProduct(@Param("id") Long id);

}
