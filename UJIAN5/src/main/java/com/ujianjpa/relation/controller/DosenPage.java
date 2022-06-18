package com.ujianjpa.relation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.ujianjpa.relation.entity.Dosen;
import com.ujianjpa.relation.services.ModelDosen;


@Controller
public class DosenPage {
	
	@Autowired
	ModelDosen modelDosen;
	@GetMapping("/dosen/view")
	public String viewIndexDosen(Model model) {
		
		model.addAttribute("listDosen",modelDosen.getAllDosen());
		
		return "dosen/view_dosen";
	}
	
	@GetMapping("/dosen/add")
	public String viewAddDosen(Model model) {
		
		model.addAttribute("dosen", new Dosen());
		
		return "dosen/add_dosen";
	}
	
	@PostMapping("/dosen/view")
	public String addDosen(@ModelAttribute Dosen dosen, Model model) {
		
		this.modelDosen.addDosen(dosen);
		model.addAttribute("listDosen",modelDosen.getAllDosen());
		
		return "dosen/view_dosen";
	}
	
	@GetMapping("/dosen/update/{id}")
	public String viewUpdateDosen(@PathVariable long id, Model model) {
		
		Dosen dosen = modelDosen.getDosenById(id);
		
		model.addAttribute("dosen", dosen);
		
		return "dosen/add_dosen";
	}
	
	@GetMapping("/dosen/delete/{id}")
	public String deleteDosen(@PathVariable long id, Model model) {
		
		this.modelDosen.deleteDosen(id);
		model.addAttribute("listDosen",modelDosen.getAllDosen());
		
		return "dosen/view_dosen";
	}
}