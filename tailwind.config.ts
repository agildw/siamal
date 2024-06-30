import {type Config} from "tailwindcss";
import {fontFamily} from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...fontFamily.sans],
            },
            screens: {
                'sm': '600px',
                'md': '900px',
                'lg': '1200px',
                'xl': '1536px',
            }
        },

    },
    plugins: [],
} satisfies Config;
