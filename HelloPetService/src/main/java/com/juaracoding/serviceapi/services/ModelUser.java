package com.juaracoding.serviceapi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.serviceapi.entity.User;
import com.juaracoding.serviceapi.repository.UserRepository;

@Service
public class ModelUser implements ModelUserInterface {
	
	@Autowired
	UserRepository userRepo;

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return (List<User>) this.userRepo.findAll();
	}

	@Override
	public Optional<User> getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return this.userRepo.findByEmail(email);
	}

	@Override
	public User getUserByName(String name) {
		// TODO Auto-generated method stub
		return this.userRepo.findByName(name);
	}

	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		return this.userRepo.save(user);
	}

	@Override
	public Optional<User> getUserById(String id) {
		// TODO Auto-generated method stub
		return this.userRepo.findById(Long.parseLong(id));
	}

	@Override
	public void deleteUser(String id) {
		// TODO Auto-generated method stub
		this.userRepo.deleteById(Long.parseLong(id));
	}

}
