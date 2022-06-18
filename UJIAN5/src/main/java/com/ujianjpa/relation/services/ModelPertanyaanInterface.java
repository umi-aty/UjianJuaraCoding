package com.ujianjpa.relation.services;

import java.util.List;

import com.ujianjpa.relation.entity.Pertanyaan;

public interface ModelPertanyaanInterface {
	
	public List<Pertanyaan> getAllPertanyaan();
	public Pertanyaan getPertanyaanByName(String name);
	
	public Pertanyaan addPertanyaan (Pertanyaan pertanyaan);
	public Pertanyaan getPertanyaanById(long id);
	public void deletePertanyaan (long id);

}
