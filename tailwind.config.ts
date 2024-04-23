import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sansation: ['Sansation Regular', 'sans-serif'],
        sansationLight: ['Sansation Light', 'sans-serif'],
        sansationItalic: ['Sansation Italic', 'sans-serif'],
        sansationBold: ['Sansation Bold', 'sans-serif'],
        sansationBoldItalic: ['Sansation Bold Italic', 'sans-serif']
      }
    }
  },
  plugins: [],
} satisfies Config;
