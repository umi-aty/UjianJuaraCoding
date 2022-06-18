package com.ujianjpa.relation.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="pertanyaan")
public class Pertanyaan {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	@Column(name = "id_pertanyaan", length = 10, unique = true)
	@NotNull
	private String idPertanyaan;
	
	@Lob
	@NotNull
	private String pertanyaan;
	
	@Lob
	@NotNull
	private String jawaban1;
	@Lob
	@NotNull
	private String jawaban2;
	@Lob
	@NotNull
	private String jawaban3;
	@Lob
	@NotNull
	private String jawaban4;

	@Lob
	@NotNull
	private String jawaban_benar;

	@Column(name = "status_gambar", length = 1)
	private int statusGambar;
	
}
