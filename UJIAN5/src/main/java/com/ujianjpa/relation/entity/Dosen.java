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
@Table(name="dosen")
public class Dosen {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	@Column(name = "id_dosen", length = 10, unique = true)
	@NotNull
	private String idDosen;

	@Column(length = 25, unique = true) 
	@NotNull
	private String username;
	
	@Column(length = 25) 
	@NotNull
	private String password;
	
	@Column(name = "nama_dosen", length = 25) 
	@NotNull
	private String namaDosen;
	
/*	UJIAN
  	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "plot_mata_kuliah",
		joinColumns = {
				@JoinColumn(name = "id_dosen", referencedColumnName = "id",
				nullable = false, updatable = false)
		},
		inverseJoinColumns = {
				@JoinColumn(name = "id", referencedColumnName = "id",
				nullable = false, updatable = false)
		})
	private List<PlotMataKuliah> lstPlotMatkul = new ArrayList<PlotMataKuliah>();
*/
}
