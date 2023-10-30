import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../graphql/apollo-client';
import { AppProps } from 'next/app';
import "bootstrap/dist/css/bootstrap.css";

export default function WarehouseManagement({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}

