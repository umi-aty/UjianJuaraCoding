package com.juaracoding.serviceapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.User;
import com.juaracoding.serviceapi.repository.UserRepository;


@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/")
	public List<User> getAll(){
		return (List<User>) userRepo.findAll();
	}
	
	@GetMapping("/{title}")
	public List<User> getAllByName(@PathVariable String title) {
		return userRepo.findByName(title);
	}
	
	@PostMapping("/add")
	public String addBuku(@RequestBody User user) {
		userRepo.save(user);
		return "Insert Berhasil";
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteUser(@PathVariable String id) {
		userRepo.deleteById(Long.parseLong(id));
		return "Delete Berhasil";
	}
	
	@PutMapping("/update/{id}")
	public String updateUser(@PathVariable String id, @RequestBody User user) {
		user.setId(Long.parseLong(id));
		userRepo.save(user);
		return "Update Berhasil";
	}

}
