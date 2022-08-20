import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Amplify, { Auth } from "aws-amplify";
import theme from "../src/theme";

import awsconfig from "../src/aws-exports";
import AuthContext from "../src/context/AuthContext";
import AppHeader from "../src/components/Header/Header";

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
  ssr: true,
  Auth: process.env.cognito,
});
Auth.configure(awsconfig);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthContext>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppHeader />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthContext>
    </>
  );
}
