package com.ujianjpa.relation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.ujianjpa.relation.entity.MataKuliah;
import com.ujianjpa.relation.services.ModelMataKuliah;


@Controller
public class MataKuliahPage {
	
	@Autowired
	ModelMataKuliah modelMatkul;
	@GetMapping("/matkul/view")
	public String viewIndexMatkul(Model model) {
		
		model.addAttribute("listMatkul",modelMatkul.getAllMatkul());
		
		return "matkul/view_matkul";
	}
	
	@GetMapping("/matkul/add")
	public String viewAddMatkul(Model model) {
		
		model.addAttribute("matkul", new MataKuliah());
		
		return "matkul/add_matkul";
	}
	
	@PostMapping("/matkul/view")
	public String addMatkul(@ModelAttribute MataKuliah matkul, Model model) {
		
		this.modelMatkul.addMatkul(matkul);
		model.addAttribute("listMatkul",modelMatkul.getAllMatkul());
		
		return "matkul/view_matkul";
	}
	
	@GetMapping("/matkul/update/{id}")
	public String viewUpdateMatkul(@PathVariable long id, Model model) {
		
		MataKuliah matkul = modelMatkul.getMatkulById(id);
		
		model.addAttribute("matkul", matkul);
		
		return "matkul/add_matkul";
	}
	
	@GetMapping("/matkul/delete/{id}")
	public String deleteMatkul(@PathVariable long id, Model model) {
		
		this.modelMatkul.deleteMatkul(id);
		model.addAttribute("listMatkul",modelMatkul.getAllMatkul());
		
		return "matkul/view_matkul";
	}
}