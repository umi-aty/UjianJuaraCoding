package com.juaracoding.jpa.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.juaracoding.jpa.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	
}
