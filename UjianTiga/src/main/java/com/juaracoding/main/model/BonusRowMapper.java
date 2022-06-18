package com.juaracoding.main.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class BonusRowMapper implements RowMapper<Bonus> {
	
	@Override
	public Bonus mapRow(ResultSet rs, int rowNum) throws SQLException {
		Bonus bonus = new Bonus();
		bonus.setWorker_ref_id(rs.getInt("worker_ref_id"));
		bonus.setBonus_date(rs.getString("bonus_date"));
		bonus.setBonus_amount(rs.getDouble("bonus_amount"));
		
		return bonus;
	}

}