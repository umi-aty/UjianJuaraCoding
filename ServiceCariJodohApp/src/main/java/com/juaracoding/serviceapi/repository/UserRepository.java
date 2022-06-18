package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.juaracoding.serviceapi.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	@Query(value="SELECT * from users where username=?1 and phone=?2",nativeQuery = true)
	User findByLogin(String username, String phone);
	
	@Query(value = "SELECT * FROM users WHERE username != ?1 AND jenkel != ?2",nativeQuery=true)
	List<User> findCalon(String username, String jenkel);
}
