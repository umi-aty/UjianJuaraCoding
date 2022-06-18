package com.juaracoding.serviceapi.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.juaracoding.serviceapi.entity.Laporan;
import com.juaracoding.serviceapi.repository.LaporanRepository;
import com.juaracoding.serviceapi.utility.FileUtility;

import com.google.gson.Gson;

@RestController
@RequestMapping("/laporan")
public class LaporanController {
	
	@Autowired
	LaporanRepository laporanRepo;
	
	@GetMapping("/")
	public List<Laporan> getAll() {
		return laporanRepo.findAll();
	}
	
//	@PostMapping("/add")
//	public String addLaporan(@RequestBody Laporan laporan) {
//		laporanRepo.save(laporan);
//		return "Insert Berhasil";
//	}

	@PostMapping("/")
	public String addLaporan(@RequestParam(value = "file")MultipartFile file,@ModelAttribute(value="data") String dataJson) throws IOException { {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/user-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		Laporan laporan = new Gson().fromJson(dataJson, Laporan.class);
		
		if(laporan.getKejadian().equalsIgnoreCase("bencana")) {
			laporan.setStatus("bencana");
		}else {
			laporan.setStatus("kriminal");
		}
		
		laporan.setPhoto(fileName);
		Date date = new Date();
		laporan.setJam(String.valueOf(date.getHours())+":"+String.valueOf(date.getMinutes()));
		this.laporanRepo.save(laporan);
		
		return "Berhasil";
	}
	}
	@GetMapping(value = "/photo/{name}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String name) throws IOException { 
	   final InputStream in = getClass().getResourceAsStream("/user-photos/"+name);
	   return IOUtils.toByteArray(in);
	
	}
}