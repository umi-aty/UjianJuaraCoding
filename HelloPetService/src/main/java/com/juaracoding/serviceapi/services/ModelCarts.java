package com.juaracoding.serviceapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.serviceapi.entity.Carts;
import com.juaracoding.serviceapi.entity.User;
import com.juaracoding.serviceapi.repository.CartsRepository;

@Service
public class ModelCarts implements ModelCartsInterface{
	
	@Autowired
	CartsRepository cartsRepository;

	@Override
	public List<Carts> getAllCarts() {
		// TODO Auto-generated method stub
		return (List<Carts>) cartsRepository.findAll();
	}

	@Override
	public Carts addCarts(Carts carts) {
		// TODO Auto-generated method stub
		return this.cartsRepository.save(carts);
	}

	@Override
	public void deleteCart(long id) {
		// TODO Auto-generated method stub
		this.cartsRepository.deleteById(id);
	}

	@Override
	public Carts findByCartId(long id) {
		// TODO Auto-generated method stub
		return this.cartsRepository.findById(id).get();
	}

	@Override
	public List<Carts> getByUserId(User userId) {
		// TODO Auto-generated method stub
		return null;
	}

}