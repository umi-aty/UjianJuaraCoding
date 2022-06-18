package com.ujianjpa.relation.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.ujianjpa.relation.services.ModelPertanyaan;

@Controller
public class UjianPage {
	
	
	@Autowired
	ModelPertanyaan modelPertanyaan;
	
	@GetMapping("/ujian/view")
	public String viewIndexUjian(Model model) {
		

		model.addAttribute("listPertanyaan",modelPertanyaan.getAllPertanyaan());
		
		return "ujian/view_ujian";
	}

}