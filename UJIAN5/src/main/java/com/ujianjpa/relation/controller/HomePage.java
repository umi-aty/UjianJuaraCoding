package com.ujianjpa.relation.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomePage {
	
	
	
	@GetMapping("/")
	public String viewHomePage(Model model) {
		

		return "index";
		
	}
}