package com.karangandhi.teamsclone.components;

import javax.swing.*;
import javax.swing.text.Document;
import java.awt.*;

public class TextField extends JTextField {
    private String placeHolder = null;

    public TextField() {
        super();
        createTextFieldUI();
    }

    public TextField(String text) {
        super(text);
        createTextFieldUI();
    }

    public TextField(int columns) {
        super(columns);
        createTextFieldUI();
    }

    public TextField(String text, int columns) {
        super(text, columns);
        createTextFieldUI();
    }

    public TextField(Document doc, String text, int columns) {
        super(doc, text, columns);
        createTextFieldUI();
    }

    private void createTextFieldUI() {}

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (this.getText().length() > 0 || placeHolder == null || placeHolder.length() > 0) return;

        final Graphics2D graphics2D = (Graphics2D) g;
        graphics2D.setColor(this.getDisabledTextColor());
        graphics2D.drawString(this.placeHolder, this.getInsets().left, g.getFontMetrics().getMaxAscent() + getInsets().top);
    }

    public void setPlaceHolder(String placeHolder) {
        this.placeHolder = paramString();
    }

    public String getPlaceHolder() {
        return this.placeHolder;
    }
}
