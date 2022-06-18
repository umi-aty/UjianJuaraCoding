package com.ujianweb.juaracoding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.ujianweb.juaracoding.entity.Laporan;


public interface LaporanRepository extends CrudRepository<Laporan, Long> {
	
	public Laporan findById(long id);
	public Laporan findByNama(String nama);
	
	@Query (value = "select * from laporan where status = 0 ", nativeQuery = true )
    List<Laporan> countLaporanProses();

	@Query (value = "select * from laporan where status = 1 ", nativeQuery = true )
    List<Laporan> countLaporanApprove();

	@Query (value = "select * from laporan where status = 2 ", nativeQuery = true )
    List<Laporan> countLaporanReject();
}
