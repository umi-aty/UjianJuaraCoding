package com.ujianjpa.relation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ujianjpa.relation.entity.Pertanyaan;
import com.ujianjpa.relation.repository.PertanyaanRepository;

@Service
public class ModelPertanyaan implements ModelPertanyaanInterface {
	
	@Autowired
	PertanyaanRepository tanyaRepo;

	@Override
	public List<Pertanyaan> getAllPertanyaan() {
		// TODO Auto-generated method stub
		return (List<Pertanyaan>) this.tanyaRepo.findAll();
	}

	@Override
	public Pertanyaan addPertanyaan(Pertanyaan pertanyaan) {
		// TODO Auto-generated method stub
		return this.tanyaRepo.save(pertanyaan);
	}

	@Override
	public Pertanyaan getPertanyaanById(long id) {
		// TODO Auto-generated method stub
		return this.tanyaRepo.findById(id);
	}

	@Override
	public void deletePertanyaan(long id) {
		// TODO Auto-generated method stub
		this.tanyaRepo.deleteById(id);
	}

	@Override
	public Pertanyaan getPertanyaanByName(String name) {
		// TODO Auto-generated method stub
		return this.tanyaRepo.findByNamaPertanyaan(name);
	}

}
