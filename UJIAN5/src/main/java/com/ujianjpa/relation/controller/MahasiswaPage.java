package com.ujianjpa.relation.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.ujianjpa.relation.entity.Mahasiswa;
import com.ujianjpa.relation.services.ModelMahasiswa;


@Controller
public class MahasiswaPage {
	
	@Autowired
	ModelMahasiswa modelMahasiswa;
	@GetMapping("/mahasiswa/view")
	public String viewIndexMahasiswa(Model model) {
		
		model.addAttribute("listMahasiswa",modelMahasiswa.getAllMahasiswa());
		
		return "mahasiswa/view_mahasiswa";
	}

	@GetMapping("/mahasiswa/add")
	public String viewAddMahasiswa(Model model) {
		
		//buat menampung data mahasiswa dihalaman html nya
		model.addAttribute("mahasiswa", new Mahasiswa());
		
		return "mahasiswa/add_mahasiswa";
	}
	
	@PostMapping("/mahasiswa/view")
	public String addMahasiswa(@ModelAttribute Mahasiswa mahasiswa, Model model) {
		
		this.modelMahasiswa.addMahasiswa(mahasiswa);
		model.addAttribute("listMahasiswa",modelMahasiswa.getAllMahasiswa());
		
		return "mahasiswa/view_mahasiswa";
	}
	
	@GetMapping("/mahasiswa/update/{id}")
	public String viewUpdateMahasiswa(@PathVariable long id, Model model) {
		
		Mahasiswa mahasiswa = modelMahasiswa.getMahasiswaById(id);
		
		model.addAttribute("mahasiswa",mahasiswa);
		
		return "mahasiswa/add_mahasiswa";
	}
	
	@GetMapping("/mahasiswa/delete/{id}")
	public String deleteMahasiswa(@PathVariable long id, Model model) {
		
		this.modelMahasiswa.deleteMahasiswa(id);
		model.addAttribute("listMahasiswa",modelMahasiswa.getAllMahasiswa());
		
		
		return "mahasiswa/view_mahasiswa";
	}
}