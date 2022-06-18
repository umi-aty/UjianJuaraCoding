package com.juaracoding.jpa.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juaracoding.jpa.entity.Book;
import com.juaracoding.jpa.repo.BookRepository;


@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;
	
	public Book saveBook(Book book) {
		return bookRepository.save(book);
	}
	
	public List<Book> saveBooks(List<Book> books){
		return bookRepository.saveAll(books);
	}
	
	public List<Book> getBooks(){
		return bookRepository.findAll();
	}
	
	public Book updateBook(Book book) {
		Book existingBook = bookRepository.findById(book.getId()).orElse(null);
		existingBook.setAuthor(book.getAuthor());
		existingBook.setIsbn(book.getIsbn());
		existingBook.setTitle(book.getTitle());
		return bookRepository.save(existingBook);
	}
	
	public String deleteBook (long id) {
		bookRepository.deleteById(id);
		return "Book didelete";
	}
	

}
