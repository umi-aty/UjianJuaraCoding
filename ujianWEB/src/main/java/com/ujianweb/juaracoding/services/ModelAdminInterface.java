package com.ujianweb.juaracoding.services;

import java.util.List;

import com.ujianweb.juaracoding.entity.Admin;


public interface ModelAdminInterface {
	
	public List<Admin> getAllAdmin();
	public Admin getAdminByUsername(String username);
	
	public Admin addAdmin (Admin admin);
	public Admin getAdminById(String id);
	public void deleteAdmin(String id);

}
