package com.dinhvankhanh.seafood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SeafoodApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeafoodApplication.class, args);
	}

}
