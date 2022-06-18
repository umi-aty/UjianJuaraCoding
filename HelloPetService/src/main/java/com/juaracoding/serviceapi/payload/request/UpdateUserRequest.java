package com.juaracoding.serviceapi.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
	private Long id;
    @NotBlank
    @Size(min = 3, max = 50)
    private String name;
 
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    private String address;
	private String provinces;
	private String regencies;
	private int zipCode;
	private String country;
	private String phoneNumber;
	private String birthday;
	private String gender;

	@JsonIgnore
	private Set<String> role;
	
	
  
}