package com.karangandhi.teamsclone.components;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import javax.swing.event.ChangeEvent;
import java.awt.*;

public class ContainerButton extends JButton {
    private static final Color pressedBackgroundColor = new Color(70, 71, 117);
    private static final Color backgroundColor = new Color(98, 100, 167);
    private static final Color hoverBackgroundColor = new Color(139, 140, 199);
    private static final Color foregroundColor = new Color(255, 255, 255);

    public ContainerButton() {
        super();
        createButtonUI();
    }

    public ContainerButton(Icon icon) {
        super(icon);
        createButtonUI();
    }

    public ContainerButton(String text) {
        super(text);
        createButtonUI();
    }

    public ContainerButton(String text, Icon icon) {
        super(text, icon);
        createButtonUI();
    }

    public void createButtonUI() {
        this.setBackground(ContainerButton.backgroundColor);
        this.setForeground(ContainerButton.foregroundColor);

        this.setFocusPainted(false);
        this.setContentAreaFilled(false);
        this.setOpaque(true);
        this.setFont(Fonts.Medium.deriveFont(14f));

        int topBottom = (30 - 16) / 2;
        this.setBorder(BorderFactory.createCompoundBorder(new EmptyBorder(2, 2, 2, 2), new EmptyBorder(topBottom - 2, topBottom * 4, topBottom - 2, topBottom * 4)));

        this.addChangeListener((ChangeEvent) -> {
            if (this.getModel().isPressed()) {
                setBackground(ContainerButton.pressedBackgroundColor);
            } else if (this.getModel().isRollover()) {
                setBackground(ContainerButton.hoverBackgroundColor);
            } else {
                setBackground(ContainerButton.backgroundColor);
            }
        });
    }
}