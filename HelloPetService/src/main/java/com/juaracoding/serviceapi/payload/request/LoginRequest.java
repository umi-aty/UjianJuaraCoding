package com.juaracoding.serviceapi.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
	@NotBlank
	private String email;

	@NotBlank
	private String password;


}