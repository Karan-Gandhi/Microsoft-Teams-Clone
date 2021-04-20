package com.karangandhi.teamsclone;

import com.karangandhi.teamsclone.components.Fonts;
import com.karangandhi.teamsclone.views.LoginScreen;

import javax.swing.*;
import java.awt.*;
import java.io.IOException;

public class App {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(App::createWindow);
        try {
            Fonts.InitialiseFonts();
        } catch (IOException | FontFormatException exception) {
            exception.printStackTrace();
        }
    }

    private static void createWindow() {
        JFrame frame = new JFrame("Microsoft Teams Clone");
        createUI(frame);

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//        frame.setUndecorated(true);
        frame.setSize(1200, 800);
        frame.setVisible(true);
    }

    private static void createUI(JFrame frame) {
        // Login screen
        frame.add(LoginScreen.getLoginScreen(frame));
    }
}
