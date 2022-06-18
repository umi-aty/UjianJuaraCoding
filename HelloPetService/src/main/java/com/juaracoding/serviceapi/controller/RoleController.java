package com.juaracoding.serviceapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.Role;
import com.juaracoding.serviceapi.repository.RoleRepository;
import com.juaracoding.serviceapi.repository.RoleUserRepository;
import com.juaracoding.serviceapi.repository.UserRepository;

@RestController
@RequestMapping("/roles")
@PreAuthorize("hasRole('ADMIN')")
public class RoleController {

	@Autowired
	UserRepository userRepo;

	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	RoleUserRepository roleUserRepo;
	
	@GetMapping("/")
	public List<Role> getAll(){
		return (List<Role>) roleRepo.findAll();
	}
		
	@PostMapping("/add")
	public String addRole(@RequestBody Role role) {
		roleRepo.save(role);
		return "Added Successfully";
	}

	@PutMapping("/update/{id}")
	public String updateRole(@PathVariable String id, @RequestBody Role role) {
		roleRepo.save(role);
		return "Updated Successfully";
	}

	@GetMapping("/delete/{id}")
	public String deleteRole(@PathVariable String id, @RequestBody Role role) {
		roleRepo.deleteById(Long.parseLong(id));
		return "Deleted Successfully";
	}
	
	
	/* menampilkan id user dan rolenya */
	@GetMapping("/AllRoleUsers")
	public List<Role> getRoleAllUsers(){
		return (List<Role>) roleUserRepo.RoleUsers();
	}

}
