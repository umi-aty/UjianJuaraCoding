package com.ujianjpa.relation.repository;

import org.springframework.data.repository.CrudRepository;

import com.ujianjpa.relation.entity.Pertanyaan;

public interface PertanyaanRepository extends CrudRepository<Pertanyaan, Long> {

	public Pertanyaan findById(long id);
	public Pertanyaan findByNamaPertanyaan(String name);

}
