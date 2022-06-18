package com.juaracoding.serviceapi.controller;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.Doctors;
import com.juaracoding.serviceapi.payload.response.MessageResponse;
import com.juaracoding.serviceapi.repository.DoctorsRepository;
import com.juaracoding.serviceapi.services.ModelDoctor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/doctors")
public class DoctorController {

	@Autowired 
	DoctorsRepository doctorRepo;
	
	@Autowired
	ModelDoctor modelDoctor;
	
	@GetMapping("/")
	public List<Doctors> getAllDoctors() {
	    
		return this.modelDoctor.getAllDoctors();
	    
	  }
	
	@GetMapping("/{id}")
	public ResponseEntity<Doctors> getDoctorsById(@PathVariable("id") Long id) {
	    Optional<Doctors> doctorsData = doctorRepo.findById(id);

	    if (doctorsData.isPresent()) {
	      return new ResponseEntity<>(doctorsData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	@PostMapping("/")
	public ResponseEntity<?> addDoctor(@ModelAttribute Doctors postDoctors){
		
		Doctors doctors = new Doctors(postDoctors.getNoStr(), postDoctors.getUser());
		
		doctorRepo.save(doctors);
		
		return ResponseEntity.ok(new MessageResponse("Doctor added successfully!"));
	}
	
	@PutMapping("/{id}")
	public String updateDoctor(@PathVariable Long id, @ModelAttribute Doctors updateDoctors, Model model) {
		
		updateDoctors.setId(id);
		Doctors doctors = new Doctors(updateDoctors.getNoStr(), updateDoctors.getUser());
		
		doctors.setId(id);
		this.doctorRepo.save(doctors);
		
		return "Doctor updated successfully!";

	}
	
	@DeleteMapping("/{id}")
	public String deleteDoctor(@PathVariable Long id, Model model) {
		this.modelDoctor.deleteDoctors(id);
		return "Doctor deleted successfully!";
	}
}
