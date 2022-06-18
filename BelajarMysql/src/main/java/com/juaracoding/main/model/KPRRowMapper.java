package com.juaracoding.main.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class KPRRowMapper implements RowMapper<KPR> {
	
	@Override
	public KPR mapRow(ResultSet rs, int rowNum) throws SQLException {
		KPR kpr = new KPR();
		kpr.setAngsuranke(rs.getInt("angsuranke"));
		kpr.setTanggal(rs.getString("tanggal"));
		kpr.setTotalAngsuran(rs.getDouble("totalAngsuran"));
		kpr.setAngsuranPokok(rs.getDouble("angsuranPokok"));
		kpr.setAngsuranBunga(rs.getDouble("angsuranBunga"));
		kpr.setSisaPinjaman(rs.getDouble("sisaPinjaman"));
		return kpr;
	}
}
