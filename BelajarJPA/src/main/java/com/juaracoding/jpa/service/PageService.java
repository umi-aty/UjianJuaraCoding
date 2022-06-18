package com.juaracoding.jpa.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.jpa.entity.Page;
import com.juaracoding.jpa.repo.PageRepository;


@Service
public class PageService {
	
	@Autowired
	private PageRepository pageRepository;
	
	public Page savePage(Page page) {
		return pageRepository.save(page);
	}
	
	public List<Page> savePages(List<Page> pages){
		return pageRepository.saveAll(pages);
	}
	
	public List<Page> getPages(){
		return pageRepository.findAll();
	}
	
	public Page updatePage(Page page) {
		Page existingPage = pageRepository.findById(page.getId()).orElse(null);
		existingPage.setChapter(page.getChapter());
		existingPage.setContent(page.getContent());
		existingPage.setNumber(page.getNumber());
		existingPage.setBook_id(page.getBook_id());
		return pageRepository.save(existingPage);
	}
	
	public String deletePage (long id) {
		pageRepository.deleteById(id);
		return "Page didelete";
	}
	

}
