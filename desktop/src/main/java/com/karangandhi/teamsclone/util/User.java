package com.karangandhi.teamsclone.util;

public class User {
    public String name;
    public String id;
    public String email;
    public String password;
    public String[] teams;

    public User(String name, String id, String email, String password, String[] teams) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.password = password;
        this.teams = teams;
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.id = null;
        this.email = email;
        this.password = password;
        this.teams = new String[]{};
    }
}
