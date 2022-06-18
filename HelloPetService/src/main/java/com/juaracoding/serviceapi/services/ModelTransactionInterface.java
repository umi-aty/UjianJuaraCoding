package com.juaracoding.serviceapi.services;

import java.util.List;

import com.juaracoding.serviceapi.entity.Transactions;

public interface ModelTransactionInterface {

	List<Transactions> getAllTransaction();
	
	public Transactions addTransaction(Transactions transactions);
	
	public void deleteTransaction(String id);
	
	public Transactions getTransactionById(String id);
}
