package com.juaracoding.serviceapi.controller;

import java.io.IOException;
import java.io.InputStream;
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

import com.google.gson.Gson;
import com.juaracoding.serviceapi.entity.Calon;
import com.juaracoding.serviceapi.entity.User;
import com.juaracoding.serviceapi.repository.CalonRepository;
import com.juaracoding.serviceapi.repository.UserRepository;
import com.juaracoding.serviceapi.utility.FileUtility;

@RestController
@RequestMapping("/")
public class UserController {

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	CalonRepository calonRepo;

	@GetMapping("/")
	public List<User> getAll(){
		return (List<User>) userRepo.findAll();
	}

	@GetMapping("/login")
	public User loginUser(@RequestParam("username")String username, @RequestParam("phone") String phone) {
		return userRepo.findByLogin(username, phone);
	}

	@GetMapping("/calon")
	public List<User> findCalon(@RequestParam("username")String username, @RequestParam("jenkel")String jenkel) {
		return (List<User>)userRepo.findCalon(username, jenkel);
	}
	
	@PostMapping("/addCalon")
	public String addCalon(@RequestParam(value = "file")MultipartFile file,@ModelAttribute(value="data") String dataJson) throws IOException { {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/user-photos/calon/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		Calon calon= new Gson().fromJson(dataJson, Calon.class);
		calon.setPhoto(fileName);
		this.calonRepo.save(calon);		
		return "Berhasil";
	}
	}
	
	@PostMapping("/register")
	public String addUser(@RequestParam(value = "file")MultipartFile file,@ModelAttribute(value="data") String dataJson) throws IOException { {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
		String uploadDir = "src/main/java/user-photos/" ;
		
		FileUtility.saveFile(uploadDir, fileName, file);
		User user= new Gson().fromJson(dataJson, User.class);
		user.setPhoto(fileName);
		this.userRepo.save(user);		
		return "Berhasil";
	}
	}
	@GetMapping(value = "/photo/{name}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String name) throws IOException { 
	   final InputStream in = getClass().getResourceAsStream("/user-photos/"+name);
	   return IOUtils.toByteArray(in);
	
	}
}
