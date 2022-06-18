package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.juaracoding.serviceapi.entity.Calon;

public interface CalonRepository extends JpaRepository<Calon, Long> {
	
	@Query(value = "UPDATE users set users.username = calons.username, users.name = calons.name, "
			+ "users.phone = calons.phone, users.umur = calons.umur, users.photo = calons.photo,"
			+ "users.longitude = calons.longitude, users.latitude = calons.latitude"
			+ "FROM users JOIN calons ON (users.id = calons.id)",nativeQuery=true)
	List<Calon> getCalon();

}
