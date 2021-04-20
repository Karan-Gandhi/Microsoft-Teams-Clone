package com.karangandhi.teamsclone.components;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import javax.swing.text.Document;
import javax.xml.soap.Text;
import java.awt.*;

public class TextField extends JTextField {
    private static final Color backgroundColor = new Color(32, 31, 31);
    private static final Color placeHolderColor = new Color(200, 198, 196);
    private static final Color borderColor = new Color(98, 100, 167);
    private static final Color foregroundColor = new Color(255, 255, 255);

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

    private void createTextFieldUI() {
        this.setBackground(TextField.backgroundColor);
        this.setForeground(TextField.foregroundColor);
//        this.setBorder(BorderFactory.createCompoundBorder(new LineBorder(TextField.borderColor, 2), new EmptyBorder(5, 5, 5, 5)));
        this.setBorder(BorderFactory.createCompoundBorder(BorderFactory.createMatteBorder(0, 0, 2, 0, TextField.borderColor), new EmptyBorder(5, 5, 5, 5)));
        this.setCaretColor(foregroundColor);
//        this.setFont(new Font("Poppins", Font.PLAIN, 14));
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        if (this.getText().length() > 0 || placeHolder == null || placeHolder.length() == 0) {
            return;
        }

        final Graphics2D graphics2D = (Graphics2D) g;
        graphics2D.setColor(TextField.placeHolderColor);
        graphics2D.drawString(this.placeHolder, this.getInsets().left, g.getFontMetrics().getMaxAscent() + getInsets().top);
    }

    public void setPlaceHolder(String placeHolder) {
        this.placeHolder = placeHolder;
    }

    public String getPlaceHolder() {
        return this.placeHolder;
    }
}
