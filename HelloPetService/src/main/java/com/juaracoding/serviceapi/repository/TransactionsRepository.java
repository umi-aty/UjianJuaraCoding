package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.juaracoding.serviceapi.entity.Transactions;

public interface TransactionsRepository extends CrudRepository<Transactions, Long> {

	@Query(value="select * from transactions as c where c.users_id =:userId order by id desc limit 1", nativeQuery = true)
	List<Transactions> findsByUserId(Long userId);
}
