package com.ujianjpa.relation.entity;

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
@Table(name="mahasiswa")
public class Mahasiswa {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	@Column(name = "nim", length = 8, unique = true)
	@NotNull
	private String nim;

	@Column(name = "nama_mahasiswa", length = 25) 
	@NotNull
	private String namaMahasiswa;
	
	@Column(name = "jenis_kelamin", length = 10) 
	@NotNull
	private String jenisKelamin;
	
	@Column(name = "password", length = 25) 
	@NotNull
	private String password;
	
	/*	UJIAN
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "plot_mata_kuliah",
		joinColumns = {
				@JoinColumn(name = "nim", referencedColumnName = "id",
				nullable = false, updatable = false)
		},
		inverseJoinColumns = {
				@JoinColumn(name = "id", referencedColumnName = "id",
				nullable = false, updatable = false)
		})
	private List<PlotMataKuliah> lstPlotMatkul = new ArrayList<PlotMataKuliah>();
*/

}
