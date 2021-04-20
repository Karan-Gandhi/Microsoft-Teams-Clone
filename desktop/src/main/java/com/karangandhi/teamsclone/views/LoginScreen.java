package com.karangandhi.teamsclone.views;

import com.karangandhi.teamsclone.components.ContainerButton;
import com.karangandhi.teamsclone.components.OutlineButton;
import com.karangandhi.teamsclone.components.TextField;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

public class LoginScreen {
    private static final Color rootBackgroundColour = new Color(44, 44, 44);

    public static JPanel getLoginScreen(JFrame frame) {
        JPanel root = new JPanel();
        root.setBackground(rootBackgroundColour);

        OutlineButton button = new OutlineButton("Close");
        ContainerButton button1 = new ContainerButton("Join");

        TextField textField = new TextField();
        textField.setPlaceHolder("Hello, world");

        root.add(button1);
        root.add(button);
        root.add()

        return root;
    }
}
