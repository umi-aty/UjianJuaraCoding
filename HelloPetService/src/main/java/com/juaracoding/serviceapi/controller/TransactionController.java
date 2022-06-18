package com.juaracoding.serviceapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juaracoding.serviceapi.entity.Transactions;
import com.juaracoding.serviceapi.repository.TransactionsRepository;
import com.juaracoding.serviceapi.services.ModelTransaction;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/transactions")
public class TransactionController {
	
	@Autowired 
	ModelTransaction modelTransaction;
	
	@Autowired
	TransactionsRepository transactionsRepo;

	@GetMapping("/")
    public List<Transactions> indexTransactions() {
    	return modelTransaction.getAllTransaction();
    }
	
	@GetMapping("/{userId}")
	  public ResponseEntity<?> getTransactionByUserId(@PathVariable("userId") Long userId) {
	      List<Transactions> transactionData = transactionsRepo.findsByUserId(userId);
	      
	      if (!transactionData.isEmpty()) {
	        return new ResponseEntity<>(transactionData, HttpStatus.OK);
	      } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	      }
	    }
	
	@PostMapping("/")
	public String addTransaction(@ModelAttribute Transactions postTransaction, Model model){

		this.modelTransaction.addTransaction(postTransaction);
		model.addAttribute("ListTransactions",modelTransaction.getAllTransaction());
		
		return "Transactions added successfully!";
	}
	
}
