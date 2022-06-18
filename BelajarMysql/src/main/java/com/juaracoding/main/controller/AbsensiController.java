package com.juaracoding.main.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.main.model.Absensi;
import com.juaracoding.main.model.AbsensiRowMapper;

@RestController
@RequestMapping("/absensi")
public class AbsensiController {

	@Autowired
	JdbcTemplate jdbc;

	public List<Absensi> getAbsensiFindbyDate(String date) {
		String sql = "SELECT * FROM absensi WHERE start_date = '%"+date+"%' OR end_date LIKE '%"+date+"%'";
		List<Absensi> absensi = jdbc.query(sql, new AbsensiRowMapper());
		return absensi;
	}

	public List<Absensi> getAbsensi() {
		String sql = "SELECT * FROM absensi";
		List<Absensi> absensi = jdbc.query(sql, new AbsensiRowMapper());
		return absensi;
	}

	public int insertAbsensi(Absensi absensi) {
		return jdbc.update("INSERT INTO absensi(id,nik,start_date,end_date) values ('" + absensi.getId() + "','"
				+ absensi.getNik() + "','" + absensi.getStart_date() + "','" + absensi.getEnd_date() + "')");
	}

	public int updateAbsensi(String id, Absensi absensi) {
		return jdbc.update("UPDATE absensi SET nik = '" + absensi.getNik() + "', start_date = '" + absensi.getStart_date()
				+ "', end_date = '" + absensi.getEnd_date() + "' WHERE id = '" + absensi.getId() + "' ");
	}

	public int deleteAbsensi(String id) {
		return jdbc.update("DELETE FROM absensi WHERE id = '" + id + "'");
	}

//	Create
	@PostMapping("/")
	public String add(@RequestBody Absensi absensi) {

		if (this.insertAbsensi(absensi) == 1) {
			return "Insert data berhasil";
		} else {
			return "Insert data gagal";
		}
	}
	
//	Read
	@GetMapping("/")
	public List<Absensi> list() {
		return getAbsensi();
	}

	
	
//	Tugas
	@GetMapping("/date/{date}")
	public List<Absensi> findDate(@PathVariable String date) {
			return getAbsensiFindbyDate(date);
	}

	//	Update	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@RequestBody Absensi absensi, @PathVariable String id) {
		try {
			updateAbsensi(id, absensi);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
//	Delete
	@DeleteMapping("/{id}")
	public void delete(@PathVariable String id) {
		deleteAbsensi(id);
	}


}
