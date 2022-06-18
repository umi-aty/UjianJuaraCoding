package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.juaracoding.serviceapi.entity.Role;

public interface RoleUserRepository extends JpaRepository<Role, Long> {

	@Query (value = "select users.id, roles.name from roles INNER JOIN user_roles\r\n"
			+ "ON roles.id = user_roles.role_id \r\n"
			+ "JOIN users ON users.id = user_roles.user_id", nativeQuery = true )
    List<Role> RoleUsers();
	
}
