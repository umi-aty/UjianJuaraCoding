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

import com.juaracoding.main.model.Biodata;
import com.juaracoding.main.model.BiodataRowMapper;

@RestController
@RequestMapping("/biodata")
public class BiodataController {

	@Autowired
	JdbcTemplate jdbc;

	public List<Biodata> getBiodata() {
		String sql = "SELECT * FROM Biodata ";
		List<Biodata> biodata = jdbc.query(sql, new BiodataRowMapper());
		return biodata;
	}

	public int insertBiodata(Biodata biodata) {
		return jdbc.update("INSERT INTO biodata(nik,nama,alamat,id_salary) values ('" + biodata.getNik() + "','"
				+ biodata.getNama() + "','" + biodata.getAlamat() + "'," + biodata.getId_salary() + ")");
	}

	public int updateBiodata(String nik, Biodata biodata) {
		return jdbc.update("UPDATE biodata SET nama = '" + biodata.getNama() + "', alamat = '" + biodata.getAlamat()
				+ "', id_salary = '" + biodata.getId_salary() + "' WHERE nik = '" + biodata.getNik() + "' ");
	}

	public int deleteBiodata(String nik) {
		return jdbc.update("DELETE FROM biodata WHERE nik = '" + nik + "'");
	}

//	Create
	@PostMapping("/")
	public String add(@RequestBody Biodata biodata) {

		if (this.insertBiodata(biodata) == 1) {
			return "Insert data berhasil";
		} else {
			return "Insert data gagal";
		}
	}
	
//	Read
	@GetMapping("/")
	public List<Biodata> list() {
		return getBiodata();
	}

//	Update	
	@PutMapping("/{nik}")
	public ResponseEntity<?> update(@RequestBody Biodata biodata, @PathVariable String nik) {
		try {
			updateBiodata(nik, biodata);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
//	Delete
	@DeleteMapping("/{nik}")
	public void delete(@PathVariable String nik) {
		deleteBiodata(nik);
	}

	/*
	 * @RequestMapping("/testing") public String testPage() { List<Biodata>
	 * lstbiodata = getBiodata();
	 * 
	 * String dummy = ""; for (int i = 0; i < lstbiodata.size(); i++) { dummy +=
	 * lstbiodata.get(i).getNik() + " - "; dummy += lstbiodata.get(i).getNama() +
	 * " - "; dummy += lstbiodata.get(i).getAlamat() + " - "; dummy +=
	 * lstbiodata.get(i).getId_salary() + "<br>"; } return dummy; }
	 * 
	 * @RequestMapping("/insert") public String insertBiodata() {
	 * 
	 * Biodata biodata = new Biodata(); biodata.setNik("N07");
	 * biodata.setNama("Atiyah"); biodata.setAlamat("Tambun");
	 * biodata.setId_salary(123);
	 * 
	 * if (this.insertBiodata(biodata) == 1) { return "Insert Biodata Berhasil"; }
	 * else { return "Insert Biodata Gagal"; } }
	 * 
	 * @RequestMapping("/update") public String updateBiodata() {
	 * 
	 * Biodata biodata = new Biodata(); biodata.setNik("N07");
	 * biodata.setNama("Umiiiiii aty"); biodata.setAlamat("Tambun Selatan");
	 * biodata.setId_salary(12345);
	 * 
	 * if (this.updateBiodata(biodata) == 1) { return "Update Biodata Berhasil"; }
	 * else { return "Update Biodata Gagal"; } }
	 * 
	 * @RequestMapping("/delete") public String deleteBiodata() {
	 * 
	 * Biodata biodata = new Biodata(); biodata.setNik("N07");
	 * 
	 * if (this.deleteBiodata(biodata) == 1) { return "Delete Biodata Berhasil"; }
	 * else { return "Delete Biodata Gagal"; } }
	 */

}
