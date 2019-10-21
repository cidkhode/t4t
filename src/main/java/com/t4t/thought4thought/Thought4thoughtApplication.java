package com.t4t.thought4thought;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import com.t4t.thought4thought.service.PassEncrypt;

@SpringBootApplication(scanBasePackages={"com.t4t.thought4thought"})

public class Thought4thoughtApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		String passwordToHash = "password2";
		PassEncrypt passEncrypt = new PassEncrypt();
		byte[] salt = passEncrypt.getSalt();

		String securePassword = get_SHA_1_SecurePassword(passwordToHash, salt);
		System.out.println(securePassword);

		securePassword = get_SHA_256_SecurePassword(passwordToHash, salt);
		System.out.println(securePassword);

		securePassword = get_SHA_384_SecurePassword(passwordToHash, salt);
		System.out.println(securePassword);

		securePassword = get_SHA_512_SecurePassword(passwordToHash, salt);
		System.out.println(securePassword);

		SpringApplication.run(Thought4thoughtApplication.class, args);
	}

}
