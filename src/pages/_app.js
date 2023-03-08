import Layout from "../components//Layout";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { options } from "../configs/swrConfig";

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
        <NotificationsProvider>
          <SWRConfig value={options}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
