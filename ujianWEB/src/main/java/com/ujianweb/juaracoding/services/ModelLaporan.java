package com.ujianweb.juaracoding.services;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ujianweb.juaracoding.entity.Laporan;
import com.ujianweb.juaracoding.repository.LaporanRepository;


@Service
public class ModelLaporan implements ModelLaporanInterface{
	
	@Autowired
	LaporanRepository laporanRepo;
	
	@PersistenceContext
    private EntityManager em;

	@Override
	public List<Laporan> getAllLaporan() {
		// TODO Auto-generated method stub
		return (List<Laporan>) this.laporanRepo.findAll();
	}

	@Override
	public Laporan getLaporanByNama(String nama) {
		// TODO Auto-generated method stub
		return this.laporanRepo.findByNama(nama);
	}

	@Override
	public Laporan addLaporan(Laporan laporan) {
		// TODO Auto-generated method stub
		return this.laporanRepo.save(laporan);
	}

	@Override
	public Laporan getLaporanById(String id) {
		// TODO Auto-generated method stub
		return this.laporanRepo.findById(Long.parseLong(id));
	}

	@Override
	public void deleteLaporan(String id) {
		// TODO Auto-generated method stub
		this.laporanRepo.deleteById(Long.parseLong(id));
	}
	
	public void save(Laporan updateStatus) {
        // TODO Auto-generated method stub
		this.laporanRepo.save(updateStatus);
    }
	
	public long count() {
        return laporanRepo.count();
    }

	@Override
	public List<Laporan> countLaporanProses() {
		// TODO Auto-generated method stub
		return this.laporanRepo.countLaporanProses();
	}

	@Override
	public List<Laporan> countLaporanApprove() {
		// TODO Auto-generated method stub
		return this.laporanRepo.countLaporanApprove();
	}

	@Override
	public List<Laporan> countLaporanReject() {
		// TODO Auto-generated method stub
		return this.laporanRepo.countLaporanReject();
	}

}