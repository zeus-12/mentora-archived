import Layout from "../components/Layout";
import "../../styles/globals.css";
import { MantineProvider } from "@mantine/core";
// import '../../styles/Folder.css'

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider refetchInterval={0} session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
