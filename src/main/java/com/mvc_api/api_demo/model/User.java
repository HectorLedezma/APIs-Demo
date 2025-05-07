package com.mvc_api.api_demo.model;

public class User {
    private final int id;
    private final String pass;
    private final String nombre;

    public User(int id, String pass, String nombre) {
        this.id = id;
        this.pass = pass;
        this.nombre = nombre;
    }

    public int getId() {
        return id;
    }

    public String getPass() {
        return pass;
    }

    public String getNombre() {
        return nombre;
    }
    
}
