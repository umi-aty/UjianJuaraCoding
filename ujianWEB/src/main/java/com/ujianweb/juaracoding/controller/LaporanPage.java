package com.ujianweb.juaracoding.controller;


import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ujianweb.juaracoding.entity.Laporan;
import com.ujianweb.juaracoding.services.ModelLaporan;
import com.ujianweb.juaracoding.utility.FileUtility;



@Controller
public class LaporanPage {
	
	@Autowired
	ModelLaporan modelLaporan;
	
	@GetMapping("/laporan/view")
	public String viewIndexlaporan(Model model) {
		model.addAttribute("active",2);
		model.addAttribute("listLaporan",modelLaporan.getAllLaporan());
		return "laporan/view_laporan";
	}

	@GetMapping("/laporan/update")
	public String updateIndexlaporan(Model model) {
		
		model.addAttribute("listLaporan",modelLaporan.getAllLaporan());
		return "laporan/update_laporan";
	}

	@GetMapping("/laporan/add")
	public String viewAddlaporan(Model model) {
		
		model.addAttribute("active",2);
		model.addAttribute("laporan", new Laporan());
		return "laporan/add_laporan";
	}
	
	@PostMapping("/laporan/view")
	public String addLaporan(@RequestParam(value = "file")MultipartFile file,@ModelAttribute Laporan laporan, Model model) throws IOException { {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "user-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		laporan.setPhoto("/"+uploadDir + fileName);
		this.modelLaporan.addLaporan(laporan);
		model.addAttribute("listLaporan",modelLaporan.getAllLaporan());
		
		return "laporan/view_laporan";
	}
	}
	
	@GetMapping("/laporan/update/{id}")
	public String viewUpdatelaporan(@PathVariable String id, Model model) {
		
		Laporan laporan = modelLaporan.getLaporanById(id);
		
		model.addAttribute("laporan",laporan);
		
		return "laporan/add_laporan";
	}
	
	@GetMapping("/laporan/delete/{id}")
	public String deletelaporan(@PathVariable String id, Model model) {
		
		this.modelLaporan.deleteLaporan(id);
		model.addAttribute("listLaporan",modelLaporan.getAllLaporan());
		
		return "laporan/view_laporan";
	}
	
	@GetMapping("/laporan/approve/{id}")
    public String approveLaporan(@PathVariable String id, Model model) {

        Laporan updateStatus = modelLaporan.getLaporanById(id);
        updateStatus.setStatus(1);
        modelLaporan.save(updateStatus);
        
        return "redirect:/laporan/view";
    }
	
	@GetMapping("/laporan/reject/{id}")
    public String rejectLaporan(@PathVariable String id, Model model) {

        Laporan updateStatus = modelLaporan.getLaporanById(id);
        updateStatus.setStatus(2);
        modelLaporan.save(updateStatus);
        
        return "redirect:/laporan/view";
	}
	
//	@GetMapping("/laporan/print")
//	public String viewReportLaporan(Model model) {
//		exportPDF();
//		return "redirect:/laporan/view";
//	}
//	
//	public void exportPDF() {
//		try {
//		File file = ResourceUtils.getFile("classpath:laporan.jrxml");
//		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
//		
//		List<Laporan> lstlaporan = modelLaporan.getAllLaporan();
//        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lstlaporan);
//        
//        Map<String, Object> parameters = new HashMap<>();
//        parameters.put("title","Juaracoding");
//        parameters.put("condition", "id = 'id' ORDER BY id");
//        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
//        String path = "E:\\laporan.pdf";
//        JasperExportManager.exportReportToPdfFile(jasperPrint,path);
//       
//		}catch (Exception e) {
//			// TODO: handle exception
//			System.out.println(e.getMessage());
//		}
//				
//	}
	
}