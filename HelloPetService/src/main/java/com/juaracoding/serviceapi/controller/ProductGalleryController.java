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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.juaracoding.serviceapi.entity.ProductGalleries;
import com.juaracoding.serviceapi.payload.response.MessageResponse;
import com.juaracoding.serviceapi.repository.ProductGalleriesRepository;
import com.juaracoding.serviceapi.services.ModelProductGallery;
import com.juaracoding.serviceapi.utility.FileUtility;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/productGalleries")
public class ProductGalleryController {

	@Autowired 
	ModelProductGallery modelProductGallery;
	
	@Autowired
	ProductGalleriesRepository galleriesRepository;
	
	@GetMapping("/")
    public List<ProductGalleries> indexProductGalleries() {    	
    	
    	return modelProductGallery.getAllProductImages();
    }
	
	@GetMapping("/gallery/{id}")
	public List<ProductGalleries> getProduct(@PathVariable("id") Long id) {
	    return galleriesRepository.findAllGalleryByProduct(id);
	  }
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductGalleries> getProductGalleryById(@PathVariable("id") Long id) {
	    Optional<ProductGalleries> productGalleryData = galleriesRepository.findById(id);

	    if (productGalleryData.isPresent()) {
	      return new ResponseEntity<>(productGalleryData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	@PostMapping("/")
	public ResponseEntity<?> addGallery(@RequestParam(value = "file")MultipartFile file, @ModelAttribute ProductGalleries productGalleries, Model model) throws IOException { {
		
		ProductGalleries updateGallery = new ProductGalleries(productGalleries.getImage(),productGalleries.getProducts());

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/productGallery-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		
		updateGallery.setImage(fileName);
		
		this.modelProductGallery.addProductImages(updateGallery);
		model.addAttribute("listProduct",modelProductGallery.getAllProductImages());
		
		return ResponseEntity.ok(new MessageResponse("Gallery added successfully!"));
	}
	}
	
	@GetMapping(value = "/photo/{image}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String image) throws IOException { 
	   final InputStream in = getClass().getResourceAsStream("/productGallery-photos/"+image);
	   return IOUtils.toByteArray(in);
	
	}
	
	@DeleteMapping("/{id}")
    public String deleteProductGallery(@PathVariable String id, Model model) {
    	
    	this.modelProductGallery.deleteProductImage(id);
    	
		return "Product Gallery {id} deleted successfully";
    	
    }
	
}
