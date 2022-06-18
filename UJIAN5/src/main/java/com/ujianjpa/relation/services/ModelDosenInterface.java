package com.ujianjpa.relation.services;

import java.util.List;

import com.ujianjpa.relation.entity.Dosen;


public interface ModelDosenInterface {
	
	public List<Dosen> getAllDosen();
	public Dosen getDosenByName(String name);
	
	public Dosen addDosen (Dosen dosen);
	public Dosen getDosenById(long id);
	public void deleteDosen(long id);

}
