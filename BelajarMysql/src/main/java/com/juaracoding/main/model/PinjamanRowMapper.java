package com.juaracoding.main.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PinjamanRowMapper implements RowMapper<Pinjaman> {
		
		@Override
		public Pinjaman mapRow(ResultSet rs, int rowNum) throws SQLException {
			Pinjaman pinjaman = new Pinjaman();
			pinjaman.setId(rs.getInt("id"));
			pinjaman.setDateFrom(rs.getString("dateFrom"));
			pinjaman.setPlatfon(rs.getInt("platfon"));
			pinjaman.setBunga(rs.getDouble("bunga"));
			pinjaman.setLamapinjaman(rs.getInt("lamapinjaman"));
			return pinjaman;
		}

	

}
