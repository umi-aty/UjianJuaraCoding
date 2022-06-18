package com.juaracoding.serviceapi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(	name = "carts")
public class Carts {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonIgnoreProperties("carts")
	@ManyToOne
	@JoinColumn(name="users_id", nullable = false)
    private User users;
	
	@JsonIgnoreProperties("carts")
	@OneToOne
	@JoinColumn(name="products_id", nullable = false)
    private Products products;

	private int qty;

	public Carts() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Carts(User users, Products products, int qty) {
		super();
		this.users = users;
		this.products = products;
		this.qty = qty;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUsers() {
		return users;
	}

	public void setUsers(User users) {
		this.users = users;
	}

	public Products getProducts() {
		return products;
	}

	public void setProducts(Products products) {
		this.products = products;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}
	
}