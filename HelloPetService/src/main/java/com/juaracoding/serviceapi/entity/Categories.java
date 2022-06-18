package com.juaracoding.serviceapi.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(	name = "categories")
public class Categories {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String categoryName;
	private String description;
	private String categoryImage;
	
	public Categories(String categoryName, String description, String categoryImage) {
		this.categoryName = categoryName;
		this.description = description;
		this.categoryImage = categoryImage;
	}
	
	
	@JsonIgnoreProperties("categories")
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "categories")
    private Set<Products> products = new HashSet<Products>();
	
	public Categories() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategoryImage() {
		return categoryImage;
	}

	public void setCategoryImage(String categoryImage) {
		this.categoryImage = categoryImage;
	}

	public Set<Products> getProducts() {
		return products;
	}


	public void setProducts(Set<Products> products) {
		this.products = products;
	}
}
