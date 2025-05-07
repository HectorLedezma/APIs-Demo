package com.mvc_api.api_demo.connection;

import com.mvc_api.api_demo.controller.varios.EnvConfig;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySQL {
    
    private EnvConfig config = new EnvConfig();
    
    private String driver = config.get("MySQL_driver");
    private String host = config.get("MySQL_host");
    private String port = config.get("MySQL_port");
    private String user = config.get("MySQL_user");
    private String pass = config.get("MySQL_pass");
    private String db = config.get("MySQL_db");
    
    private String state = "OK";

    private String url = "jdbc:mysql://"+host+":"+port+"/"+db+"?useSSL=false";
    
    public Connection connect() {
        Connection conn = null;

        try {
            Class.forName(driver);
            conn = DriverManager.getConnection(this.url, this.user, this.pass);
            this.setState("Conexión establecieda");
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Error: \n"+e.getMessage());
            e.printStackTrace();
            this.setState(e.getMessage());
        }

        return conn;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
    
    
    
}
