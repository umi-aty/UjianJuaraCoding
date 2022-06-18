package com.ujianjpa.relation.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="mata_kuliah")
public class MataKuliah {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	@Column(name = "id_mata_kuliah", length = 10, unique = true)
	@NotNull
	private String idMataKuliah;

	@Column(name = "nama_mata_kuliah", length = 25) 
	@NotNull
	private String namaMataKuliah;
	
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "plot_mata_kuliah",
		joinColumns = {
				@JoinColumn(name = "id_mata_kuliah", referencedColumnName = "id",
				nullable = false, updatable = false)
		},
		inverseJoinColumns = {
				@JoinColumn(name = "id", referencedColumnName = "id",
				nullable = false, updatable = false)
		})
	private List<PlotMataKuliah> lstPlotMatkul = new ArrayList<PlotMataKuliah>();

}
