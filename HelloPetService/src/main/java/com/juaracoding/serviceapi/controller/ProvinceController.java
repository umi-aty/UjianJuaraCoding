package com.juaracoding.serviceapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.Provinces;
import com.juaracoding.serviceapi.repository.ProvincesRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/provinces")
public class ProvinceController {
	
	@Autowired
	ProvincesRepository provinceRepo;
	
	@GetMapping("/")
	public List<Provinces> indexProvince() {
		return (List<Provinces>) provinceRepo.findAll();
	}

}
