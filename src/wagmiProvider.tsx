import React from 'react';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Configuración de chains y providers
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

// Configuración de wallets y conectores
const { connectors } = getDefaultWallets({
  appName: 'My DApp',
  chains,
});

// Configuración del cliente Wagmi
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Tipado explícito de props
type WagmiProviderProps = {
  children: React.ReactNode;
};

// Componente proveedor
export const WagmiProvider = ({ children }: WagmiProviderProps) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} children={undefined}>
      {children /* Pasar children explícitamente */}
    </RainbowKitProvider>
  </WagmiConfig>
);
