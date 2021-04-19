package com.karangandhi.teamsclone.components;

import java.awt.*;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class Fonts {
    public static Font Black, Bold, ExtraBold, ExtraLight, Light, Medium, Regular, SemiBold, Thin;

    public static void InitialiseFonts() throws IOException, FontFormatException {
//        FileOutputStream testFile = new FileOutputStream("HELLO_WORLD");
//        testFile.write(new String("Hello, world").getBytes());
//        testFile.flush();
//        testFile.close();

        File BlackFile = new File("./src/main/resources/Fonts/Poppins-Black.ttf");
        File BoldFile = new File("./src/main/resources/Fonts/Poppins-Bold.ttf");
        File ExtraBoldFile = new File("./src/main/resources/Fonts/Poppins-ExtraBold.ttf");
        File ExtraLightFile = new File("./src/main/resources/Fonts/Poppins-ExtraLight.ttf");
        File LightFile = new File("./src/main/resources/Fonts/Poppins-Light.ttf");
        File MediumFile = new File("./src/main/resources/Fonts/Poppins-Medium.ttf");
        File RegularFile = new File("./src/main/resources/Fonts/Poppins-Regular.ttf");
        File SemiBoldFile = new File("./src/main/resources/Fonts/Poppins-SemiBold.ttf");
        File ThinFile = new File("./src/main/resources/Fonts/Poppins-Thin.ttf");

        Black = Font.createFont(Font.TRUETYPE_FONT, BlackFile);
        Bold = Font.createFont(Font.TRUETYPE_FONT, BoldFile);
        ExtraBold = Font.createFont(Font.TRUETYPE_FONT, ExtraBoldFile);
        ExtraLight = Font.createFont(Font.TRUETYPE_FONT, ExtraLightFile);
        Light = Font.createFont(Font.TRUETYPE_FONT, LightFile);
        Medium = Font.createFont(Font.TRUETYPE_FONT, MediumFile);
        Regular = Font.createFont(Font.TRUETYPE_FONT, RegularFile);
        SemiBold = Font.createFont(Font.TRUETYPE_FONT, SemiBoldFile);
        Thin = Font.createFont(Font.TRUETYPE_FONT, ThinFile);
    }
}
