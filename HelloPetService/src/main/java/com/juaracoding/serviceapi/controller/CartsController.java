package com.juaracoding.serviceapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.Carts;
import com.juaracoding.serviceapi.payload.response.MessageResponse;
import com.juaracoding.serviceapi.repository.CartsRepository;
import com.juaracoding.serviceapi.services.ModelCarts;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/carts")
public class CartsController {

	
	@Autowired
	ModelCarts modelCarts;
	
	@Autowired
	CartsRepository cartsRepository;
	
	@GetMapping("/")
	public List<Carts> getAllCarts() {
	    
		return modelCarts.getAllCarts();
	    
	  }
	@GetMapping("/countCart")
	public Long CountCartByIdUser(@RequestParam("userId") Long userId) {
		return cartsRepository.countCartUserId(userId);
	}
	
//	@GetMapping("u/{userId}/{id}")
//	public ResponseEntity<Carts> getCartsById(@PathVariable("userId") Long userId, @PathVariable("id") Long id) {
//	    Optional<Carts> cartsData = cartsRepository.findById(id);
//
//	    if (cartsData.isPresent()) {
//	      return new ResponseEntity<>(cartsData.get(), HttpStatus.OK);
//	    } else {
//	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//	    }
//	  }
	
	@GetMapping("u/{userId}")
	  public ResponseEntity<?> getCartByUserId(@PathVariable("userId") Long userId) {
	      List<Carts> cartsData = cartsRepository.findsByUserId(userId);
	      
	      if (!cartsData.isEmpty()) {
	        return new ResponseEntity<>(cartsData, HttpStatus.OK);
	      } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	      }
	    }
	
	@GetMapping("/sumCart")
	public Long SumCartUser(@RequestParam("userId") Long userId) {
		return cartsRepository.SumCartUserId(userId);
	}
	
	@PostMapping("/")
	public ResponseEntity<?> addCarts(@ModelAttribute Carts postCarts){
		
		Carts carts = new Carts(postCarts.getUsers(), postCarts.getProducts(), postCarts.getQty());
		
		cartsRepository.save(carts);
		
		return ResponseEntity.ok(new MessageResponse("Carts added successfully!"));
	}
	
//	@PutMapping("/u/{userId}")
//	public String updateCarts(@PathVariable Long userId, @RequestParam Long id, @ModelAttribute Carts updateCarts, Model model) {
//		
//		updateCarts.setId(id);
//		Carts carts = new Carts(updateCarts.getUsers(), updateCarts.getProducts(), updateCarts.getQty());
//		
//		carts.setId(id);
//		this.cartsRepository.save(carts);
//		
//		return "sukses";
//
//	}
	
	@DeleteMapping("/u/{userId}")
	public String deleteCartsByIdUSer(@PathVariable Long userId, Model model) {
		this.cartsRepository.deleteByUserId(userId);
		return "Carts deleted successfully!";
	}
	
	@DeleteMapping("/{id}")
	public String deleteCarts(@PathVariable Long id, Model model) {
		this.modelCarts.deleteCart(id);
		return "Carts deleted successfully!";
	}
}