package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.juaracoding.serviceapi.entity.User;

public interface UserRepository extends CrudRepository<User, Long>{

	@Query(value = "SELECT * FROM user WHERE name LIKE %?1%",nativeQuery=true)
	List<User> findByName(String name);
}
