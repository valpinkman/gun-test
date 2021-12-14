import "../styles/globals.css";
import { GunProvider } from "../src/hooks/useGun";

function MyApp({ Component, pageProps }) {
  return (
    <GunProvider>
      <Component {...pageProps} />
    </GunProvider>
  );
}

export default MyApp;
