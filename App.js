import Routes from './src/routes'
import React from 'react';
import StoreProvider from './src/Store/Provider';

export default function App() {
  return (
    <StoreProvider>
    <Routes/>
    </StoreProvider>
  );
}

