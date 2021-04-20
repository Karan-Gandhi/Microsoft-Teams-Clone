package com.karangandhi.teamsclone.views;

import com.karangandhi.teamsclone.components.*;
import com.karangandhi.teamsclone.components.TextField;

import javax.swing.*;
import java.awt.*;

public class LoginScreen {
    private static final Color rootBackgroundColour = new Color(44, 44, 44);
    private static final Color foregroundColor = new Color(255, 255, 255);

    public static JPanel getLoginScreen(JFrame frame) {
        JPanel root = new JPanel();
        JPanel loginPane = new JPanel();
        JLabel loginText = new JLabel("Login");
        TextField emailField = new TextField(30);
        PasswordTextField passwordField = new PasswordTextField(30);

        root.setBackground(LoginScreen.rootBackgroundColour);
        loginPane.setBackground(LoginScreen.rootBackgroundColour);

        emailField.setPlaceHolder("Email");
        passwordField.setPlaceHolder("Password");

        loginText.setFont(Fonts.Medium.deriveFont(30f));
        loginText.setBackground(new Color(0, 0, 0, 0));
        loginText.setForeground(LoginScreen.foregroundColor);

        loginPane.setLayout(new BoxLayout(loginPane, BoxLayout.Y_AXIS));
        root.setLayout(new BorderLayout());

        loginPane.add(loginText);
        loginPane.add(emailField);
        loginPane.add(passwordField);
        root.add(loginPane, BorderLayout.CENTER);
        return root;
    }
}
