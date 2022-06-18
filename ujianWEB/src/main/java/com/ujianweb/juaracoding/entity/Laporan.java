package com.ujianweb.juaracoding.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="laporan")
public class Laporan {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	@NotNull
	private String nama;
	
	@NotNull
	private String kejadian;

	@NotNull
	private String alamat;

	@NotNull
	private String keterangan;

	@NotNull
	private String photo;

	@Column(length = 1)
	@NotNull
	private int status;

}
