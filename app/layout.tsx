import "@mantine/core/styles.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Container,
} from "@mantine/core";
import { shadcnTheme } from "../theme";
import "../style.css";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Taskium",
  description: "Something big coming soon!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={GeistSans.className}>
        <MantineProvider theme={shadcnTheme}>
          <Container
            mih="100vh"
            style={{ display: "flex", flexDirection: "column" }}
            p="0"
            fluid
          >
            <p>Navbar</p>
            <Container
              size="xl"
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
              w="100%"
            >
              {children}
            </Container>
            <p>Footer</p>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
