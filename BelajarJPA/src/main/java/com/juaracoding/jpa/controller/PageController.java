package com.juaracoding.jpa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.jpa.entity.Page;
import com.juaracoding.jpa.service.PageService;



@RestController
public class PageController {
	
	@Autowired
	private PageService pageService;
	
	@PostMapping("/addPage")
	public Page addPage(@RequestBody Page page) {
		return pageService.savePage(page);
	}
	
	@PostMapping("/addPages")
	public List<Page> addPages(@RequestBody List<Page> pages) {
		return pageService.savePages(pages);
	}
	
	@GetMapping("/page")
	public List<Page> getPages(){
		return pageService.getPages();
	}
	
	@PutMapping("/updatePage")
	public Page updatePage(@RequestBody Page page) {
		return pageService.updatePage(page);
	}
	
	@DeleteMapping("/deletePage/{id}")
	public String deleteString(@PathVariable long id) {
		return pageService.deletePage(id);
	}

}
