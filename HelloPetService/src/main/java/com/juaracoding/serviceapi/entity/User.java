package com.juaracoding.serviceapi.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(	name = "users" 
		/*,uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username"),
			@UniqueConstraint(columnNames = "email") 
		}*/)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Size(max = 20)	
	private String username;
	
	@Size(max = 50)
	private String email;

	@Size(max = 120)
	private String password;

    private String name;
	private String address;
	private String provinces;
	private String regencies;
	private int zipCode;
	private String country;
	private String phoneNumber;
	private String gender;
	
	
	@JsonIgnoreProperties("users")
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> role = new HashSet<>();

		public User() {
		super();
		// TODO Auto-generated constructor stub
		}
		
		public User(String name, @Size(max = 20) String username, @Size(max = 50) String email,
		@Size(max = 120) String password, String address, String provinces, String regencies,
		int zipCode, String country, String phoneNumber, String gender) {
	super();
	this.name = name;
	this.username = username;
	this.email = email;
	this.password = password;
	this.address = address;
	this.provinces = provinces;
	this.regencies = regencies;
	this.zipCode = zipCode;
	this.country = country;
	this.phoneNumber = phoneNumber;
	this.gender = gender;
}
		public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getProvinces() {
		return provinces;
	}
	public void setProvincesId(String provinces) {
		this.provinces = provinces;
	}
	public String getRegencies() {
		return regencies;
	}
	public void setRegencies(String regencies) {
		this.regencies = regencies;
	}
	public int getZipCode() {
		return zipCode;
	}
	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Set<Role> getRole() {
		return role;
	}
	public void setRole(Set<Role> role) {
		this.role = role;
	}
	
		public User(String name, String username, String email, String password) {
			this.name = name;
			this.username = username;
			this.email = email;
			this.password = password;
		}

		
}
