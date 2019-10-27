package com.t4t.thought4thought.utils;

import org.apache.commons.lang3.RandomStringUtils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordEncryptor {
    public String generateRandomSalt() {
        return RandomStringUtils.randomAlphabetic(10);
    }

    public String encryptPassword(String plainTextPass, String salt) {
        String saltedHashedPass=null;
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt.getBytes(StandardCharsets.UTF_8));
            byte[] bytes = md.digest(plainTextPass.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for(int i=0; i<bytes.length ; i++){
                sb.append(Integer.toString((bytes[i]& 0xff) + 0x100, 16).substring(1));
            }
            saltedHashedPass = sb.toString();
        } catch(NoSuchAlgorithmException e){
            e.printStackTrace();
        }
        return saltedHashedPass;
    }
}
