package com.juaracoding.serviceapi.repository;

import org.springframework.data.repository.CrudRepository;

import com.juaracoding.serviceapi.entity.Doctors;

public interface DoctorsRepository extends CrudRepository<Doctors, Long> {

}
