import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#F3F3F3", // Light off-white background
            },
        },
    },
});

export default theme;
