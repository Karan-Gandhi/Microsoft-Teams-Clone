package com.karangandhi.teamsclone.views;

import com.karangandhi.teamsclone.components.ContainerButton;

import javax.swing.*;

public class LoginScreen {
    public static JPanel getLoginScreen() {
        JPanel root = new JPanel();

        root.add(new ContainerButton("Test button"));

        return root;
    }
}
