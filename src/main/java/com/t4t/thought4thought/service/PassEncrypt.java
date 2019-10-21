package com.t4t.thought4thought.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class PassEncrypt {

    public static void main(String[] args) throws NoSuchAlgorithmException
    {
        String passwordToHash = &amp;quot;password&amp;quot;;
        byte[] salt = getSalt();

        String securePassword = get_SHA_1_SecurePassword(passwordToHash, salt);
        System.out.println(securePassword);

        securePassword = get_SHA_256_SecurePassword(passwordToHash, salt);
        System.out.println(securePassword);

        securePassword = get_SHA_384_SecurePassword(passwordToHash, salt);
        System.out.println(securePassword);

        securePassword = get_SHA_512_SecurePassword(passwordToHash, salt);
        System.out.println(securePassword);
    }

    public static String get_SHA_1_SecurePassword(String passwordToHash, byte[] salt)
    {
        String generatedPassword = null;
        try{
            MessageDigest md = MessageDigest.getInstance(&amp;quot;SHA-1&amp;quot;);
            md.update(salt);
            byte[] bytes = md.digest(passwordToHash.getBytes());
            StringBuilder sb = new StringBuilder();
            for(int i=0; i&amp;lt; bytes.length;i++)
            {
                sb.append(Integer.toString((bytes[i] &amp;amp; 0xff) + 0x100,16).substring(1));
            }
            generatedPassword = sb.toString();
        }
        catch(NoSuchAlgorithmException e)
        {
            e.printStackTrace();
        }
        return generatedPassword;
    }

    public static String get_SHA_256_SecurePassword(String passwordToHash,byte[] salt)
    {
        //Use MessageDigest md = MessageDigest.getInstance(&amp;quot;SHA-256&amp;quot;);
    }
    public static String get_SHA_384_SecurePassword(String passwordToHash, byte[] salt)
    {
        //Use MessageDigest md = MessageDigest.getInstance(&amp;quot;SHA-384&amp;quot;);
    }

    public static String get_SHA_512_SecurePassword(String passwordToHash, byte[] salt)
    {
        //Use MessageDigest md = MessageDigest.getInstance(&amp;quot;SHA-512&amp;quot;);
    }
    //Add Salt
    public static byte[] getSalt() throws NoSuchAlgorithmException
    {
        SecureRandom sr = SecureRandom.getInstance(&amp;quot;SHA1PRNG&amp;quot;);
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return salt;
    }

}
