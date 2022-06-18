package com.juaracoding.serviceapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.serviceapi.entity.Doctors;
import com.juaracoding.serviceapi.repository.DoctorsRepository;

@Service
public class ModelDoctor implements ModelDoctorInterface{

	@Autowired
	DoctorsRepository doctorRepo;
	
	@Override
	public List<Doctors> getAllDoctors() {
		// TODO Auto-generated method stub
		return (List<Doctors>) this.doctorRepo.findAll();
	}

	@Override
	public Doctors addDoctors(Doctors doctors) {
		// TODO Auto-generated method stub
		return this.doctorRepo.save(doctors);
	}

	@Override
	public void deleteDoctors(long id) {
		// TODO Auto-generated method stub
		this.doctorRepo.deleteById(id);
		
	}

	@Override
	public Doctors findByDoctorsId(long id) {
		// TODO Auto-generated method stub
		return this.doctorRepo.findById(id).get();
	}

}
