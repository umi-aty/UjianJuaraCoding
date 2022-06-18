package com.juaracoding.serviceapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.juaracoding.serviceapi.entity.Laporan;

public interface LaporanRepository extends JpaRepository<Laporan, Long> {

	public Laporan findById(long id);
	public Laporan findByNama(String nama);
}
