package com.juaracoding.serviceapi.services;

import java.util.List;

import com.juaracoding.serviceapi.entity.Doctors;

public interface ModelDoctorInterface {

	List<Doctors> getAllDoctors();
	
	public Doctors addDoctors(Doctors doctors);
	
	public void deleteDoctors(long id);
	
	public Doctors findByDoctorsId(long id);

}
