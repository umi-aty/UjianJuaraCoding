package com.juaracoding.serviceapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.User;
import com.juaracoding.serviceapi.repository.UserRepository;

@RestController
@RequestMapping("/")
public class UserController {
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/")
	public List<User> getAll(){
		return (List<User>) userRepo.findAll();
	}

	@GetMapping("/login")
	public User loginUser(@RequestParam("email")String email, @RequestParam("phone") String phone) {
		return userRepo.findByLogin(email, phone);
	}

	@PostMapping("/register")
	public String addUser(@RequestBody User user) {
		userRepo.save(user);
		return "Insert Berhasil";
	}
	
	@PostMapping("/register/{id}")
	public String updateUser(@PathVariable String id, @RequestBody User user) {
		user.setId(Long.parseLong(id));
		userRepo.save(user);
		return "Update Berhasil";
	}
	
//	@DeleteMapping("/delete/{id}")
//	public String deleteUser(@PathVariable String id) {
//		userRepo.deleteById(Long.parseLong(id));
//		return "Delete Berhasil";
//	}
//	
//	@PutMapping("/update/{id}")
//	public String updateUser(@PathVariable String id, @RequestBody User user) {
//		user.setId(Long.parseLong(id));
//		userRepo.save(user);
//		return "Update Berhasil";
//	}
	

}
