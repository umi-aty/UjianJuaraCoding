package com.juaracoding.serviceapi.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(	name = "transactions")
public class Transactions {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int insurancePrice;
	private int shippingPrice;
	private int totalPrice;
	private String transactionStatus;
	
	@JsonIgnoreProperties("transactions")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name="users_id", nullable=false)
    private User users;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getInsurancePrice() {
		return insurancePrice;
	}

	public void setInsurancePrice(int insurancePrice) {
		this.insurancePrice = insurancePrice;
	}

	public int getShippingPrice() {
		return shippingPrice;
	}

	public void setShippingPrice(int shippingPrice) {
		this.shippingPrice = shippingPrice;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getTransactionStatus() {
		return transactionStatus;
	}

	public void setTransactionStatus(String transactionStatus) {
		this.transactionStatus = transactionStatus;
	}
	
	public User getUsers() {
		return users;
	}

	public void setUsers(User users) {
		this.users = users;
	}

	public Transactions(int insurancePrice, int shippingPrice, int totalPrice, String transactionStatus,
			User users) {
		super();
		this.insurancePrice = insurancePrice;
		this.shippingPrice = shippingPrice;
		this.totalPrice = totalPrice;
		this.transactionStatus = transactionStatus;
		this.users = users;
	}

	public Transactions() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
