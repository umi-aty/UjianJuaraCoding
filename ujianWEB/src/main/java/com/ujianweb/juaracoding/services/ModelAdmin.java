package com.ujianweb.juaracoding.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ujianweb.juaracoding.entity.Admin;
import com.ujianweb.juaracoding.repository.AdminRepository;

@Service
public class ModelAdmin implements ModelAdminInterface {
	
	@Autowired
	AdminRepository adminRepo;

	@Override
	public List<Admin> getAllAdmin() {
		// TODO Auto-generated method stub
		return (List<Admin>) this.adminRepo.findAll();
	}

	@Override
	public Admin getAdminByUsername(String username) {
		// TODO Auto-generated method stub
		return this.adminRepo.findByUsername(username);
	}

	@Override
	public Admin addAdmin(Admin admin) {
		// TODO Auto-generated method stub
		return this.adminRepo.save(admin);
	}

	@Override
	public Admin getAdminById(String id) {
		// TODO Auto-generated method stub
		return this.adminRepo.findById(Long.parseLong(id));
	}

	@Override
	public void deleteAdmin(String id) {
		// TODO Auto-generated method stub
		this.adminRepo.deleteById(Long.parseLong(id));
	}

}
