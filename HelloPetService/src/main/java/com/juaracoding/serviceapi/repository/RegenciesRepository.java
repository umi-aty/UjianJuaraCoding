package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.juaracoding.serviceapi.entity.Regencies;

public interface RegenciesRepository extends CrudRepository<Regencies, Long> {

	@Query(value="select * from regencies where provinces_id =:id", nativeQuery = true)
	List<Regencies> findByIdProvince(@Param("id") Long id);

}
