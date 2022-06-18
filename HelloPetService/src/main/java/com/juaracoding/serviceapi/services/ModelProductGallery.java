package com.juaracoding.serviceapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.serviceapi.entity.ProductGalleries;
import com.juaracoding.serviceapi.repository.ProductGalleriesRepository;

@Service
public class ModelProductGallery implements ModelProductGalleryInterface{

	@Autowired
	ProductGalleriesRepository productGaleryRepository;
	
	@Override
	public List<ProductGalleries> getAllProductImages() {
		// TODO Auto-generated method stub
		return (List<ProductGalleries>) this.productGaleryRepository.findAll();
	}

	@Override
	public ProductGalleries addProductImages(ProductGalleries productImages) {
		// TODO Auto-generated method stub
		return this.productGaleryRepository.save(productImages);
	}

	@Override
	public void deleteProductImage(String id) {
		// TODO Auto-generated method stub
		this.productGaleryRepository.deleteById(Long.parseLong(id));
	}

	@Override
	public ProductGalleries cariProductImage(String id) {
		// TODO Auto-generated method stub
		return this.productGaleryRepository.findById(Long.parseLong(id)).get();
	}

	@Override
	public List<ProductGalleries> addProductImagesList(List<ProductGalleries> productImagesList) {
		// TODO Auto-generated method stub
		return (List<ProductGalleries>) this.productGaleryRepository.saveAll(productImagesList);
	}


}
