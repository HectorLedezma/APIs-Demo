package com.mvc_api.api_demo.varios;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encryptor {

    public String encryptSHA256(String input) {
        try {
            // Crear una instancia de SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            // Procesar el String y obtener el hash en bytes
            byte[] encodedHash = digest.digest(input.getBytes());
            
            // Convertir los bytes en un String hexadecimal
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            
            return hexString.toString();
            
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al encriptar el texto", e);
        }
    }
    
    
}
