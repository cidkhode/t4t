package com.t4t.thought4thought;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication(scanBasePackages={"com.t4t.thought4thought"})

public class Thought4thoughtApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(Thought4thoughtApplication.class, args);
	}

}
