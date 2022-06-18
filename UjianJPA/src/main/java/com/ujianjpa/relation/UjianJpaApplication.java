package com.ujianjpa.relation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ujianjpa.relation.entity.Admin;
import com.ujianjpa.relation.entity.Dosen;
import com.ujianjpa.relation.entity.Mahasiswa;
import com.ujianjpa.relation.entity.MataKuliah;
import com.ujianjpa.relation.entity.Nilai;
import com.ujianjpa.relation.entity.Pertanyaan;
import com.ujianjpa.relation.entity.PlotMataKuliah;
import com.ujianjpa.relation.entity.Soal;
import com.ujianjpa.relation.repository.AdminRepository;
import com.ujianjpa.relation.repository.DosenRepository;
import com.ujianjpa.relation.repository.MahasiswaRepository;
import com.ujianjpa.relation.repository.MataKuliahRepository;
import com.ujianjpa.relation.repository.NilaiRepository;
import com.ujianjpa.relation.repository.PertanyaanRepository;
import com.ujianjpa.relation.repository.PlotMataKuliahRepository;
import com.ujianjpa.relation.repository.SoalRepository;

@SpringBootApplication
public class UjianJpaApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(UjianJpaApplication.class, args);
	}
	
	@Autowired
	AdminRepository adminRepository;
	@Autowired
	DosenRepository dosenRepository;
	@Autowired
	MahasiswaRepository mahasiswaRepository;
	@Autowired
	MataKuliahRepository matkulRepository;
	@Autowired
	PlotMataKuliahRepository plotMatkulRepository;
	@Autowired
	SoalRepository soalRepository;
	@Autowired
	PertanyaanRepository pertanyaanRepository;
	@Autowired
	NilaiRepository nilaiRepository;


	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	
	  	Admin admin = new Admin();
		admin.setUsername("abc");
		admin.setPassword("xxx");	
		this.adminRepository.save(admin);
	
				
		Dosen dosen = new Dosen();
		dosen.setIdDosen("Dos1");
		dosen.setUsername("dosen11");
		dosen.setPassword("abc");
		dosen.setNamaDosen("dewa");
		
		Mahasiswa mahasiswa = new Mahasiswa();
		mahasiswa.setNim("mhs001");
		mahasiswa.setPassword("abc");
		mahasiswa.setJenisKelamin("Perempuan");
		mahasiswa.setNamaMahasiswa("Umi");
		
		MataKuliah matkul = new MataKuliah();
		matkul.setIdMataKuliah("mk001");
		matkul.setNamaMataKuliah("Kalkulus");

		List<Dosen> lstDosen = new ArrayList<Dosen>();
		lstDosen.add(dosen);
		this.dosenRepository.save(dosen);
		
		List<Mahasiswa> lstMahasiswa = new ArrayList<Mahasiswa>();
		lstMahasiswa.add(mahasiswa);
		this.mahasiswaRepository.save(mahasiswa);
		
		List<MataKuliah> lstMatkul = new ArrayList<MataKuliah>();
		lstMatkul.add(matkul);
		this.matkulRepository.save(matkul);
		
		//tambah objek plot lagi jika ingin simpan beberapa soal di plot lain
		PlotMataKuliah plot = new PlotMataKuliah();
		plot.setIdDosen(dosen.getIdDosen());
		plot.setNim(mahasiswa.getNim());
		plot.setIdMataKuliah(matkul.getIdMataKuliah());

		List<PlotMataKuliah> lstPlotMatkul = new ArrayList<PlotMataKuliah>();
		lstPlotMatkul.add(plot);
		
		dosen.setLstPlotMatkul(lstPlotMatkul);
		mahasiswa.setLstPlotMatkul(lstPlotMatkul);
		matkul.setLstPlotMatkul(lstPlotMatkul);

//		this.plotMatkulRepository.save(plot);

		Soal soal1 = new Soal();
		soal1.setIdSoal("Soal1");
		soal1.setNamaSoal("Soal Ujian Kalkulus");
		soal1.setStatus(1);
		
		Soal soal2 = new Soal();
		soal2.setIdSoal("Soal2");
		soal2.setNamaSoal("Soal Ujian Inggris");
		soal2.setStatus(1);
		
		//tambah list soal lagi jika ingin simpan beberapa pertanyaan di soal lain
		List<Soal> lstSoal = new ArrayList<Soal>();  //list soal(n)
		lstSoal.add(soal1);
		lstSoal.add(soal2);
		plot.setLstSoal(lstSoal);
		this.plotMatkulRepository.save(plot);
		
		Pertanyaan pertanyaan1 = new Pertanyaan();
		pertanyaan1.setIdPertanyaan("Tanya1");
		pertanyaan1.setJawaban1("bebek");
		pertanyaan1.setJawaban2("ayam");
		pertanyaan1.setJawaban3("burung");
		pertanyaan1.setJawaban4("angsa");
		pertanyaan1.setJawaban_benar("ayam");
		pertanyaan1.setStatusGambar(1);

		Pertanyaan pertanyaan2 = new Pertanyaan();
		pertanyaan2.setIdPertanyaan("Tanya2");
		pertanyaan2.setJawaban1("duck");
		pertanyaan2.setJawaban2("chicken");
		pertanyaan2.setJawaban3("bird");
		pertanyaan2.setJawaban4("angsa");
		pertanyaan2.setJawaban_benar("duck");
		pertanyaan2.setStatusGambar(1);
		
		List<Pertanyaan> lstPertanyaan = new ArrayList<Pertanyaan>();	//list pertanyaan(n)
		lstPertanyaan.add(pertanyaan1);
		lstPertanyaan.add(pertanyaan2);
		soal1.setLstPertanyaan(lstPertanyaan);
//		this.soalRepository.save(soal1);
		
		Nilai nilai1 = new Nilai();
		nilai1.setNilai(100);
		
		List<Nilai> lstNilai = new ArrayList<Nilai>();
		lstNilai.add(nilai1);
		soal1.setLstNilai(lstNilai);
		this.soalRepository.save(soal1);
				
	}

}
