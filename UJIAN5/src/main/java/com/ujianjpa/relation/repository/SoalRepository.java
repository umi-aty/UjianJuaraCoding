package com.ujianjpa.relation.repository;

import org.springframework.data.repository.CrudRepository;

import com.ujianjpa.relation.entity.Soal;

public interface SoalRepository extends CrudRepository<Soal, Long> {
	
	public Soal findById(long id);
	public Soal findByNamaSoal(String name);

}
