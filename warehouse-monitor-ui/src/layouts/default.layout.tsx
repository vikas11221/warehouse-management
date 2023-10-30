import Head from "next/head";
import Navbar from "../components/header.component";

const DefaultLayout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>Warehouse Management</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer>
        {/* <p>&copy; 2022 My Application</p> */}
      </footer>
    </div>
  );
};

export default DefaultLayout;