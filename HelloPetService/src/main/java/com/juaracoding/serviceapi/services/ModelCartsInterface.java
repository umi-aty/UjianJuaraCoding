package com.juaracoding.serviceapi.services;

import java.util.List;

import com.juaracoding.serviceapi.entity.Carts;
import com.juaracoding.serviceapi.entity.User;

public interface ModelCartsInterface {
List<Carts> getAllCarts();
	
	public Carts addCarts(Carts carts);
	
	public void deleteCart(long id);
	
	public Carts findByCartId(long id);
	
	public List<Carts> getByUserId(User userId);

}
