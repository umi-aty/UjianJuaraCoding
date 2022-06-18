package com.juaracoding.serviceapi.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.juaracoding.serviceapi.entity.Categories;
import com.juaracoding.serviceapi.payload.response.MessageResponse;
import com.juaracoding.serviceapi.repository.CategoriesRepository;
import com.juaracoding.serviceapi.services.ModelCategory;
import com.juaracoding.serviceapi.utility.FileUtility;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	ModelCategory modelCategory;
	
	@Autowired
	CategoriesRepository categoriesRepository;
	
	@GetMapping("/")
	public List<Categories> getAllCategories() {
	    
		return modelCategory.getAllCategories();
	    
	  }
	
	@GetMapping("/{id}")
	public ResponseEntity<Categories> getCategoriesById(@PathVariable("id") Long id) {
	    Optional<Categories> categoriesData = categoriesRepository.findById(id);

	    if (categoriesData.isPresent()) {
	      return new ResponseEntity<>(categoriesData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	@PostMapping("/")
	public ResponseEntity<?> addCategory(@RequestParam(value = "file")MultipartFile file, @ModelAttribute Categories categories, Model model) throws IOException { {
		
		Categories updateCategories = new Categories(categories.getCategoryName(), categories.getDescription(),
				categories.getCategoryImage());

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/category-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		
		updateCategories.setCategoryImage(fileName);
		
		this.modelCategory.addCategory(updateCategories);
		model.addAttribute("listCategories",modelCategory.getAllCategories());
		
		return ResponseEntity.ok(new MessageResponse("Category added successfully!"));
	}
	}
	
	@GetMapping(value = "/photo/{categoryImage}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String categoryImage) throws IOException { 
	   final InputStream in = getClass().getResourceAsStream("/category-photos/"+categoryImage);
	   return IOUtils.toByteArray(in);
	
	}
	
    @PutMapping("/{id}")
	public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestParam(value = "file")MultipartFile file, @ModelAttribute Categories categories, Model model) throws IOException { {
		
		categories.setId(id);
		
		Categories updateCategory = new Categories(categories.getCategoryName(), categories.getDescription(),
				categories.getCategoryImage());

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/category-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		
		updateCategory.setCategoryImage(fileName);
		updateCategory.setId(id);
		
		this.modelCategory.addCategory(updateCategory);
		model.addAttribute("listCategories",modelCategory.getAllCategories());
		
		return ResponseEntity.ok(new MessageResponse("Category added successfully!"));
	}
	}
	
	@DeleteMapping("/{id}")
	public String deleteCategory(@PathVariable Long id, Model model) {
		this.modelCategory.deleteCategory(id);
		return "Category deleted successfully!";
	}
	
	
}
