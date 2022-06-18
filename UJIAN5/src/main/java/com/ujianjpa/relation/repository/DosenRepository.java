package com.ujianjpa.relation.repository;

import org.springframework.data.repository.CrudRepository;

import com.ujianjpa.relation.entity.Dosen;

public interface DosenRepository extends CrudRepository<Dosen, Long> {
	
	public Dosen findById(long id);
	public Dosen findByNamaDosen(String name);

}
