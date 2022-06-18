package com.juaracoding.serviceapi.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(	name = "regencies" )
public class Regencies {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	
	@JsonIgnoreProperties("regencies")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name="provinces_id", nullable=false)
    private Provinces provinces;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Provinces getProvinces() {
		return provinces;
	}

	public void setProvinces(Provinces provinces) {
		this.provinces = provinces;
	}

	public Regencies(Long id, String name, Provinces provinces) {
		super();
		this.id = id;
		this.name = name;
		this.provinces = provinces;
	}

	public Regencies() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
