package com.ujianweb.juaracoding.repository;

import org.springframework.data.repository.CrudRepository;

import com.ujianweb.juaracoding.entity.Admin;


public interface AdminRepository extends CrudRepository<Admin, Long> {
	
	public Admin findById(long id);
	public Admin findByUsername(String username);

}
