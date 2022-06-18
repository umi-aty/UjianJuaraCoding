package com.juaracoding.serviceapi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(	name = "product_galleries")
public class ProductGalleries {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	public String image;
	
	@JsonIgnoreProperties("product_galleries")
	@ManyToOne
    @JoinColumn(name="products_id", nullable=false)
	private Products products;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Products getProducts() {
		return products;
	}

	public void setProducts(Products products) {
		this.products = products;
	}

	public ProductGalleries(String image, Products products) {
		super();
		this.image = image;
		this.products = products;
	}

	public ProductGalleries() {
		super();
		// TODO Auto-generated constructor stub
	}


}
