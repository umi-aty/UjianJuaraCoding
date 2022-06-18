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

import com.juaracoding.jpa.entity.Product;
import com.juaracoding.jpa.service.ProductService;


@RestController
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/addProduct")
	public Product addProduct (@RequestBody Product product) {
		return productService.saveProduct(product);
	}
	
	@PostMapping("/addProducts")
	public List<Product> addProducts (@RequestBody List<Product> products) {
		return productService.saveProducts(products);
	}
	
	@GetMapping("/product")
	public List<Product> getProducts(){
		return productService.getProducts();
	}
	
	@GetMapping("/getProductById/{id}")
	public Product getProductById(@PathVariable int id) {
		return productService.getProductById(id);
	}
	
	@GetMapping("/getProductByName/{name}")
	public List<Product> getProductByName(@PathVariable String name) {
		return productService.getProductByName(name);
	}
	
	@GetMapping("/getProductByQuantity/{qty}")
	public List<Product> getProductByQuantity(@PathVariable int qty) {
		return productService.getProductByQuantity(qty);
	}
	
	@GetMapping("/getProductByMaxPrice")
	public List<Product> getProductByMaxPrice() {
		return productService.getProductByMaxPrice();
	}

	@PutMapping("/updateProduct")
	public Product updateProduct(@RequestBody Product product) {
		return productService.updateProduct(product);
	}
	
	@DeleteMapping("/deleteProduct/{id}")
	public String deleteString(@PathVariable int id) {
		return productService.deleteProduct(id);
	}

}
