package com.ujianjpa.relation.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ujianjpa.relation.entity.Pertanyaan;
import com.ujianjpa.relation.services.ModelPertanyaan;
import com.ujianjpa.relation.utility.FileUtility;

@Controller
public class PertanyaanPage {
	
	
	@Autowired
	ModelPertanyaan modelPertanyaan;
	
	@GetMapping("/pertanyaan/view")
	public String viewIndexPertanyaan(Model model) {
		

		model.addAttribute("listPertanyaan",modelPertanyaan.getAllPertanyaan());
		
		return "pertanyaan/view_pertanyaan";
	}
	
	@GetMapping("/pertanyaan/add")
	public String viewAddPertanyaan(Model model) {
		
		model.addAttribute("pertanyaan", new Pertanyaan());
		
		return "pertanyaan/add_pertanyaan";
	}
	
	@PostMapping("/pertanyaan/view")
	public String addPertanyaan(@RequestParam(value = "file")MultipartFile file,@ModelAttribute Pertanyaan pertanyaan, Model model) throws IOException { {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "user-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		pertanyaan.setStatusGambar("/"+uploadDir + fileName);
		this.modelPertanyaan.addPertanyaan(pertanyaan);
		model.addAttribute("listPertanyaan",modelPertanyaan.getAllPertanyaan());
		
		return "pertanyaan/view_pertanyaan";
	}
	}
	
	@GetMapping("/pertanyaan/update/{id}")
	public String viewUpdatePertanyaan(@PathVariable long id, Model model) {
		
		Pertanyaan pertanyaan = modelPertanyaan.getPertanyaanById(id);
		
		model.addAttribute("pertanyaan", pertanyaan);
		
		return "pertanyaan/add_pertanyaan";
	}
	
	@GetMapping("/pertanyaan/delete/{id}")
	public String deletePertanyaan(@PathVariable long id, Model model) {
		
		this.modelPertanyaan.deletePertanyaan(id);
		model.addAttribute("listPertanyaan",modelPertanyaan.getAllPertanyaan());
		
		return "pertanyaan/view_pertanyaan";
	}
}