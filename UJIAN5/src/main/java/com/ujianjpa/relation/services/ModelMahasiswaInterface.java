package com.ujianjpa.relation.services;

import java.util.List;

import com.ujianjpa.relation.entity.Mahasiswa;


public interface ModelMahasiswaInterface {
	
	public List<Mahasiswa> getAllMahasiswa();
	public Mahasiswa getMahasiwaByName(String name);
	
	public Mahasiswa addMahasiswa (Mahasiswa mahasiswa);
	public Mahasiswa getMahasiswaById(long id);
	public void deleteMahasiswa(long id);
	

}
