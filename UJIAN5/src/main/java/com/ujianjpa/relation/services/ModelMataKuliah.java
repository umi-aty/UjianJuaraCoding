package com.ujianjpa.relation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ujianjpa.relation.entity.MataKuliah;
import com.ujianjpa.relation.repository.MataKuliahRepository;

@Service
public class ModelMataKuliah implements ModelMataKuliahInterface{
	
	@Autowired
	MataKuliahRepository matkulRepo;

	@Override
	public List<MataKuliah> getAllMatkul() {
		// TODO Auto-generated method stub
		return (List<MataKuliah>) this.matkulRepo.findAll();
	}

	
	@Override
	public MataKuliah addMatkul(MataKuliah matkul) {
		// TODO Auto-generated method stub
		return this.matkulRepo.save(matkul);
	}

	@Override
	public MataKuliah getMatkulById(long id) {
		// TODO Auto-generated method stub
		return this.matkulRepo.findById(id);
	}

	@Override
	public void deleteMatkul(long id) {
		// TODO Auto-generated method stub
		this.matkulRepo.deleteById(id);
	}


	@Override
	public MataKuliah getMataKuliahByName(String name) {
		// TODO Auto-generated method stub
		return this.matkulRepo.findByNamaMataKuliah(name);
	}

		
}