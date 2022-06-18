package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.juaracoding.serviceapi.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

public User findById(long id);
	
	@Query(value = "SELECT *\n"
			+ "from users\n"
			+ "Where (CASE "
			+ "WHEN 'name'=:type THEN name LIKE %:value% "
			+ "WHEN 'phone'=:type THEN phone LIKE %:value% "
			+ "WHEN 'address'=:type THEN address LIKE %:value% "
			+ "WHEN 'email'=:type THEN email LIKE %:value% "
			+ "END)",nativeQuery=true)
	List<User> findBy(@Param("type")String type,@Param("value")String value);
	User findByEmail(String email); 

	@Query(value="SELECT * from users where email=?1 and phone=?2",nativeQuery = true)
	User findByLogin(String email, String phone);
}
