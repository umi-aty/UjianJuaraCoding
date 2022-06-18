package com.ujianjpa.relation.repository;

import org.springframework.data.repository.CrudRepository;

import com.ujianjpa.relation.entity.PlotMataKuliah;

public interface PlotMataKuliahRepository extends CrudRepository<PlotMataKuliah, Long> {
	
	public PlotMataKuliah findById(long id);

}
