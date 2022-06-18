package com.ujianjpa.relation.repository;

import org.springframework.data.repository.CrudRepository;

import com.ujianjpa.relation.entity.Mahasiswa;

public interface MahasiswaRepository extends CrudRepository<Mahasiswa, Long> {
	
	public Mahasiswa findById(long id);
	public Mahasiswa findByNamaMahasiswa(String name);
	
}
