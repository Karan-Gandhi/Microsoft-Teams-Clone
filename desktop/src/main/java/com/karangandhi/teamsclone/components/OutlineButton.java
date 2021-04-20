package com.karangandhi.teamsclone.components;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import java.awt.*;

public class OutlineButton extends JButton {
    private static final Color pressedBackgroundColor = new Color(72, 70, 68);
    private static final Color backgroundColor = new Color(45, 44, 44);
    private static final Color hoverBackgroundColor = new Color(59, 58, 58);
    private static final Color foregroundColor = new Color(255, 255, 255);
    private static final Color borderColor = new Color(96, 94, 92);

    public OutlineButton() {
        super();
        createButtonUI();
    }

    public OutlineButton(Icon icon) {
        super(icon);
        createButtonUI();
    }

    public OutlineButton(String text) {
        super(text);
        createButtonUI();
    }

    public OutlineButton(String text, Icon icon) {
        super(text, icon);
        createButtonUI();
    }

    public void createButtonUI() {
        this.setBackground(OutlineButton.backgroundColor);
        this.setForeground(OutlineButton.foregroundColor);

        this.setFocusPainted(false);
        this.setContentAreaFilled(false);
        this.setOpaque(true);
        this.setFont(Fonts.SemiBold.deriveFont(14f));

        int topBottom = (30 - 16) / 2;
        this.setBorder(BorderFactory.createCompoundBorder(new LineBorder(OutlineButton.borderColor, 2), new EmptyBorder(topBottom - 2, topBottom * 4, topBottom - 2, topBottom * 4)));

        this.addChangeListener((ChangeEvent) -> {
            if (this.getModel().isPressed()) {
                setBackground(OutlineButton.pressedBackgroundColor);
            } else if (this.getModel().isRollover()) {
                setBackground(OutlineButton.hoverBackgroundColor);
            } else {
                setBackground(OutlineButton.backgroundColor);
            }
        });
    }
}
