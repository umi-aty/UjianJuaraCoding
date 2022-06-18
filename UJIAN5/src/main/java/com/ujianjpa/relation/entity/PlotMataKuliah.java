package com.ujianjpa.relation.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="plot_mata_kuliah")

public class PlotMataKuliah {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	/*	UJIAN
	@Column(name = "id_dosen", length = 10, unique = true)
	@NotNull
	private String idDosen;
	@Column(name = "nim", length = 8, unique = true)
	@NotNull
	private String nim;
	@Column(name = "id_mata_kuliah", length = 10, unique = true)
	@NotNull
	private String idMataKuliah;
	*/
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_mata_kuliah")
	private MataKuliah matakuliah;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_dosen")
	private Dosen dosen;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "nim")
	private Mahasiswa mahasiswa;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_soal")
	private Soal soal;

//	@OneToMany(cascade = CascadeType.ALL)
//	@JoinColumn(name = "id_plot_matkul", referencedColumnName = "id")
//	private List<Soal> lstSoal = new ArrayList<Soal>();
	 
/*	UJIAN
	@ManyToMany(mappedBy = "lstPlotMatkul")	
	private List<Dosen> lstDosen = new ArrayList<Dosen>();

	@ManyToMany(mappedBy = "lstPlotMatkul")	
	private List<Mahasiswa> lstMahasiswa = new ArrayList<Mahasiswa>();
	
	@ManyToMany(mappedBy = "lstPlotMatkul")	
	private List<MataKuliah> lstMatkul = new ArrayList<MataKuliah>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_plot_matkul" , referencedColumnName = "id")
	private List <Soal> lstSoal = new ArrayList<Soal>();
*/	
}
