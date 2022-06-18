package com.juaracoding.serviceapi.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="calons")
public class Calon {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private long id;
	
	private long idUser;
	@Column(unique = true)
	private String username;
	private String name;
	private String jenkel;
	private String phone;
	private String umur;	
	private String photo;
	private String latitude;
	private String longitude;
	
	 @ManyToMany(mappedBy = "calons", fetch = FetchType.LAZY)
	    private Set<User> users= new HashSet<>();
	
}