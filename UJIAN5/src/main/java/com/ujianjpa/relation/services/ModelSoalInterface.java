package com.ujianjpa.relation.services;

import java.util.List;

import com.ujianjpa.relation.entity.Soal;

public interface ModelSoalInterface {
	
	public List<Soal> getAllSoal();
	public Soal getSoalByName(String name);
	public Soal addSoal(Soal Soal);
	public Soal getSoalById(long id);
	public void deleteSoal(long id);

}