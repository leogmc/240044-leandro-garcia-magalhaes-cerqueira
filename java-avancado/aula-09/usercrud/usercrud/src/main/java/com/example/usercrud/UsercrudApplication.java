package com.example.usercrud;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class UsercrudApplication{
	
	public static void main(String[] args) {
		SpringApplication.run(UsercrudApplication.class, args);
		log.info("Application started...");
	}
	
}
