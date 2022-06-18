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

import com.juaracoding.main.model.KPR;
import com.juaracoding.main.model.KPRRowMapper;
import com.juaracoding.main.model.Pinjaman;
import com.juaracoding.main.model.PinjamanRowMapper;

@RestController
@RequestMapping("/pinjaman")
public class PinjamanController {

	@Autowired
	JdbcTemplate jdbc;

	public List<KPR> getKpr() {
		String sql = "CALL `ulangBulan`('2021-03-25', 20000000, 1.2, 15)";
		List<KPR> kpr = jdbc.query(sql, new KPRRowMapper());
		return kpr;
	}

	public List<Pinjaman> getPinjaman() {
		String sql = "SELECT * FROM pinjaman ";
		List<Pinjaman> pinjaman = jdbc.query(sql, new PinjamanRowMapper());
		return pinjaman;
	}

	public int insertPinjaman(Pinjaman pinjaman) {
		return jdbc.update("INSERT INTO pinjaman(id,dateFrom,platfon,bunga,lamapinjaman) values ('" + pinjaman.getId()
				+ "','" + pinjaman.getDateFrom() + "','" + pinjaman.getPlatfon() + "','" + pinjaman.getBunga() + "',"
				+ pinjaman.getLamapinjaman() + ")");
	}

	public int updatePinjaman(String id, Pinjaman pinjaman) {
		return jdbc.update("UPDATE pinjaman SET dateFrom= '" + pinjaman.getDateFrom() + "', platfon = '"
				+ pinjaman.getPlatfon() + "', bunga = '" + pinjaman.getBunga() + "', lamapinjaman = '"
				+ pinjaman.getLamapinjaman() + "' WHERE id = '" + id + "' ");
	}

	public int deletePinjaman(String id) {
		return jdbc.update("DELETE FROM pinjaman WHERE id = '" + id + "'");
	}

//	Post KPR
	@PostMapping("/Kpr")
	public List<KPR> lstKpr(@RequestBody Pinjaman pinjaman) {
		String sql = " CALL `ulangBulan`('" + pinjaman.getDateFrom() + "', '" + pinjaman.getPlatfon() + "', '"
				+ pinjaman.getBunga() + "', '" + pinjaman.getLamapinjaman() + "')";
		List<KPR> kpr = jdbc.query(sql, new KPRRowMapper());
		return kpr;
	}

//	Read KPR
	@GetMapping("/Kpr")
	public List<KPR> listKpr() {
		return getKpr();
	}

//	Create
	@PostMapping("/")
	public String add(@RequestBody Pinjaman pinjaman) {

		if (this.insertPinjaman(pinjaman) == 1) {
			return "Insert data berhasil";
		} else {
			return "Insert data gagal";
		}
	}

//	Read
	@GetMapping("/")
	public List<Pinjaman> list() {
		return getPinjaman();
	}

//	Update	
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@RequestBody Pinjaman pinjaman, @PathVariable String id) {
		try {
			updatePinjaman(id, pinjaman);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//	Delete
	@DeleteMapping("/{id}")
	public void delete(@PathVariable String id) {
		deletePinjaman(id);
	}

}
