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

import com.juaracoding.serviceapi.entity.Products;
import com.juaracoding.serviceapi.payload.response.MessageResponse;
import com.juaracoding.serviceapi.repository.CategoriesRepository;
import com.juaracoding.serviceapi.repository.ProductsRepository;
import com.juaracoding.serviceapi.services.ModelCategory;
import com.juaracoding.serviceapi.services.ModelProduct;
import com.juaracoding.serviceapi.utility.FileUtility;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

	
	@Autowired
	ModelProduct modelProducts;
	
	@Autowired
	ProductsRepository productRepository;

	@Autowired
	ModelCategory modelCategory;
	
	@Autowired
	CategoriesRepository categoryRepository;

	@GetMapping("/")
    public List<Products> indexProducts() {
		
		return modelProducts.getAllProducts();

    }
	
	@GetMapping("/prod/{id}")
	public List<Products> getCategories(@PathVariable("id") Long id) {
	    return productRepository.findAllProductByCategory(id);
	  }
	
	@GetMapping("/{id}")
	public ResponseEntity<Products> getProductById(@PathVariable("id") Long id) {
	    Optional<Products> productsData = productRepository.findById(id);

	    if (productsData.isPresent()) {
	      return new ResponseEntity<>(productsData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }

    @PostMapping("/")
	public ResponseEntity<?> addProduct(@RequestParam(value = "file")MultipartFile file, @ModelAttribute Products products, Model model) throws IOException { {
		
		Products updateProducts = new Products(products.getProductName(), products.getPrice(), products.getStok(),
				products.getProductImage(),products.getDescription(),products.getCategories());

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/product-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		
		updateProducts.setProductImage(fileName);
		
		this.modelProducts.addProduct(updateProducts);
		model.addAttribute("listProduct",modelProducts.getAllProducts());
		
		return ResponseEntity.ok(new MessageResponse("Product added successfully!"));
	}
	}
	
    @GetMapping(value = "/photo/{productImage}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String productImage) throws IOException { 
	   final InputStream in = getClass().getResourceAsStream("/product-photos/"+productImage);
	   return IOUtils.toByteArray(in);
	
	}
	
    @PutMapping("/{id}")
	public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestParam(value = "file")MultipartFile file, @ModelAttribute Products products, Model model) throws IOException { {
		
		products.setId(id);
		
		Products updateProducts = new Products(products.getProductName(), products.getPrice(), products.getStok(),
				products.getProductImage(),products.getDescription(),products.getCategories());

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/product-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		
		updateProducts.setProductImage(fileName);
		updateProducts.setId(id);
		
		this.modelProducts.addProduct(updateProducts);
		model.addAttribute("listProduct",modelProducts.getAllProducts());
		
		return ResponseEntity.ok(new MessageResponse("Product added successfully!"));
	}
	}
	
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable String id) {
    	
    	this.modelProducts.deleteProduct(id);
//    	this.productRepository.deleteProductNew(id);
		return "Product deleted successfully!";
    	
    }
    
}
