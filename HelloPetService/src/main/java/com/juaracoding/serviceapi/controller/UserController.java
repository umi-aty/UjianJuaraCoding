package com.juaracoding.serviceapi.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.ERole;
import com.juaracoding.serviceapi.entity.Role;
import com.juaracoding.serviceapi.entity.User;
import com.juaracoding.serviceapi.payload.request.UpdateUserRequest;
import com.juaracoding.serviceapi.payload.response.MessageResponse;
import com.juaracoding.serviceapi.repository.RoleRepository;
import com.juaracoding.serviceapi.repository.UserRepository;
import com.juaracoding.serviceapi.services.ModelUser;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	ModelUser modelUser;
	
	@Autowired
	UserRepository userRepo;

	@Autowired
	RoleRepository roleRepository;
	
	@GetMapping
	public List<User> indexUsers() {
		return modelUser.getAllUser();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
	    Optional<User> userData = userRepo.findById(id);

	    if (userData.isPresent()) {
	      return new ResponseEntity<>(userData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
		
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUsers(@PathVariable String id, @RequestBody UpdateUserRequest userReq) {
		
		userReq.setId(Long.parseLong(id));		
		
		User userUpdate = new User(userReq.getName(), userReq.getUsername(),userReq.getEmail(),
				encoder.encode(userReq.getPassword()), userReq.getAddress(), 
				userReq.getProvinces(), userReq.getRegencies(), userReq.getZipCode(),
				userReq.getCountry(), userReq.getPhoneNumber(), userReq.getGender()
				 );

		Set<String> strRoles = userReq.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		userUpdate.setRole(roles);

		userUpdate.setId(Long.parseLong(id));
		this.userRepo.save(userUpdate);
		return ResponseEntity.ok(new MessageResponse("User Updated Successfully!"));
	}
	
}
