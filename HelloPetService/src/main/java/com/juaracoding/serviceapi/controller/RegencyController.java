package com.juaracoding.serviceapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.Regencies;
import com.juaracoding.serviceapi.repository.RegenciesRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/regencies")
public class RegencyController {
	
	@Autowired
	RegenciesRepository regenciesRepo;
	
	@GetMapping("/")
	public List<Regencies> indexRegency() {
		return (List<Regencies>) regenciesRepo.findAll();
	}
	
//	@GetMapping("/")
//	public List<Regencies> indexRegency(@RequestParam Long id) {
//		return (List<Regencies>) regenciesRepo.findByIdProvince(id);
//	}

}
