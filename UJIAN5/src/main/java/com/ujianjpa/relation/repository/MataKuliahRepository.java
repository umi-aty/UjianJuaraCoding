package com.ujianjpa.relation.repository;

import org.springframework.data.repository.CrudRepository;

import com.ujianjpa.relation.entity.MataKuliah;

public interface MataKuliahRepository extends CrudRepository<MataKuliah, Long> {
	
	public MataKuliah findById(long id);
	public MataKuliah findByNamaMataKuliah(String name);

	
}
