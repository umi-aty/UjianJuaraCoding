package com.ujianjpa.relation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ujianjpa.relation.entity.Soal;
import com.ujianjpa.relation.repository.SoalRepository;


@Service
public class ModelSoal  implements ModelSoalInterface{
	
	@Autowired
	SoalRepository SoalRepo;

	@Override
	public List<Soal> getAllSoal() {
		// TODO Auto-generated method stub
		return (List<Soal>) this.SoalRepo.findAll();
	}

	@Override
	public Soal getSoalByName(String name) {
		// TODO Auto-generated method stub
		return this.SoalRepo.findByNamaSoal(name);
	}

	@Override
	public Soal addSoal(Soal Soal) {
		// TODO Auto-generated method stub
		return this.SoalRepo.save(Soal);
	}

	@Override
	public Soal getSoalById(long id) {
		// TODO Auto-generated method stub
		return this.SoalRepo.findById(id);
	}

	@Override
	public void deleteSoal(long id) {
		// TODO Auto-generated method stub
		this.SoalRepo.deleteById(id);
	}
	

}