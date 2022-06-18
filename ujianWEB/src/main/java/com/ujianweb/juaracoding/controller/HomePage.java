package com.ujianweb.juaracoding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.ujianweb.juaracoding.entity.Admin;
import com.ujianweb.juaracoding.services.ModelAdmin;
import com.ujianweb.juaracoding.services.ModelLaporan;


@Controller
public class HomePage {
	
	@Autowired
	ModelLaporan modelLaporan;

	@Autowired
	ModelAdmin modelAdmin;

	@GetMapping("/")
	public String viewHomePage() {
		return "index";
	}
	
	@GetMapping("/register")
	public String registerPage(Model model) {
		
		model.addAttribute("newUser", new Admin());
		return "register";
		
	}
	
	@PostMapping("/register")
	public String registerPostPage(@ModelAttribute Admin newUser, Model model) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String plainPassword = newUser.getPassword();
		String encodedPassword = passwordEncoder.encode(plainPassword);
		newUser.setPassword(encodedPassword);		
		
		this.modelAdmin.addAdmin(newUser);
		
		
		return "redirect:/login";
		
	}
	
	@GetMapping("/login")
	public String viewLoginPage() {
			return "login";
	}
	@GetMapping("/dashboard")
	public String viewDashboardPage(Model model) {
		model.addAttribute("active",0);
		model.addAttribute("count",modelLaporan.count());
		model.addAttribute("countProses",modelLaporan.countLaporanProses().size());
		model.addAttribute("countApprove",modelLaporan.countLaporanApprove().size());
		model.addAttribute("countReject",modelLaporan.countLaporanReject().size());
		
		return "dashboard";
	}
	
}