import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/style.css";

import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Container,
} from "@mantine/core";
import { shadcnTheme } from "@/theme";
import { shadcnCssVariableResolver } from "@/cssVariableResolver";
import { GeistSans } from "geist/font/sans";

import { Notifications } from "@mantine/notifications";

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
        <MantineProvider
          theme={shadcnTheme}
          cssVariablesResolver={shadcnCssVariableResolver}
        >
          {children}
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
