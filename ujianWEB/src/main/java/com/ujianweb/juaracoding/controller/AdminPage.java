package com.ujianweb.juaracoding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.ujianweb.juaracoding.entity.Admin;
import com.ujianweb.juaracoding.services.ModelAdmin;

@Controller
public class AdminPage {
	
	@Autowired
	ModelAdmin modelAdmin;
	@GetMapping("/admin/view")
	public String viewIndexAdmin(Model model) {
		
		model.addAttribute("active",1);
		model.addAttribute("listAdmin",modelAdmin.getAllAdmin());
		return "admin/view_admin";
	}
	
	@GetMapping("/admin/add")
	public String viewAddAdmin(Model model) {
		
		model.addAttribute("admin", new Admin());
		return "admin/add_admin";
	}
	
	@PostMapping("/admin/view")
	public String addAdmin(@ModelAttribute Admin admin, Model model) {
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String plainPassword = admin.getPassword();
		String encodedPassword = passwordEncoder.encode(plainPassword);
        admin.setPassword(encodedPassword);		
        
		this.modelAdmin.addAdmin(admin);
		model.addAttribute("listAdmin",modelAdmin.getAllAdmin());
		
		return "redirect:/admin/view";
	}
	
	@GetMapping("/admin/update/{id}")
	public String viewUpdateAdmin(@PathVariable String id, Model model) {
		
		Admin admin = modelAdmin.getAdminById(id);
		
		model.addAttribute("admin", admin);
		
		return "admin/add_admin";
	}
	
	@GetMapping("/admin/delete/{id}")
	public String deleteAdmin(@PathVariable String id, Model model) {
		
		this.modelAdmin.deleteAdmin(id);
		model.addAttribute("listAdmin",modelAdmin.getAllAdmin());
		
		return "redirect:/admin/view";
	}
}
