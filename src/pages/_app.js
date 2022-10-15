import Layout from "../components/Layout";
import "../../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import '../../styles/Folder.css'
function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
