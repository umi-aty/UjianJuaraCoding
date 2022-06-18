package com.juaracoding.serviceapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.repository.CategoriesRepository;
import com.juaracoding.serviceapi.repository.ProductsRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class DashboardController {

	@Autowired
	CategoriesRepository categoryRepo;
	@Autowired
	ProductsRepository productRepo;
	
	@GetMapping("/countCategory")
	public Long CountCategory(Model model) {
		return categoryRepo.count();
	}

	@GetMapping("/countProduct")
	public Long CountProduct(Model model) {
		return productRepo.count();
	}

}
