package com.juaracoding.serviceapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.serviceapi.entity.Transactions;
import com.juaracoding.serviceapi.repository.TransactionsRepository;

@Service
public class ModelTransaction implements ModelTransactionInterface {

	@Autowired
	TransactionsRepository transactionRepo;
	
	@Override
	public List<Transactions> getAllTransaction() {
		// TODO Auto-generated method stub
		return (List<Transactions>) this.transactionRepo.findAll();
	}

	@Override
	public Transactions addTransaction(Transactions transactions) {
		// TODO Auto-generated method stub
		return this.transactionRepo.save(transactions);
	}

	@Override
	public void deleteTransaction(String id) {
		// TODO Auto-generated method stub
		this.transactionRepo.deleteById(Long.parseLong(id));
	}

	@Override
	public Transactions getTransactionById(String id) {
		// TODO Auto-generated method stub
		return this.transactionRepo.findById(Long.parseLong(id)).get();
	}

}
