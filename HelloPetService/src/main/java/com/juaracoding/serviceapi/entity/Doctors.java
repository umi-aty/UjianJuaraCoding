package com.juaracoding.serviceapi.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(	name = "doctors", 
		uniqueConstraints = {
			@UniqueConstraint(columnNames = "noStr")
		})
public class Doctors {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String noStr;
	
	@JsonIgnoreProperties("doctors")
	@OneToOne
	@JoinColumn(name="users_id", nullable = false)
    private User users;

	public Doctors() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Doctors(String noStr, User users) {
		super();
		this.noStr = noStr;
		this.users = users;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNoStr() {
		return noStr;
	}

	public void setNoStr(String noStr) {
		this.noStr = noStr;
	}

	public User getUser() {
		return users;
	}

	public void setUser(User users) {
		this.users = users;
	}}


