import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { GambaPlatformProvider, TokenMetaProvider } from 'gamba-react-ui-v2'
import { GambaProvider, SendTransactionProvider } from 'gamba-react-v2'
import { DEFAULT_POOL, PLATFORM_CREATOR_ADDRESS, PLATFORM_CREATOR_FEE, PLATFORM_JACKPOT_FEE, RPC_ENDPOINT, TOKEN_METADATA, TOKEN_METADATA_FETCHER } from './constants'
import './styles.css'
import { WagmiProvider } from './wagmiProvider' // Wagmi for Ethereum/Metamask
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)

function Root() {
  // Configuración de wallets para Solana
  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    [],
  )

  return (
    <BrowserRouter>
      <WagmiProvider>
        <ConnectionProvider
          endpoint={RPC_ENDPOINT}
          config={{ commitment: 'processed' }}
        >
          <WalletProvider autoConnect wallets={wallets}>
            <WalletModalProvider>
              <TokenMetaProvider
                tokens={TOKEN_METADATA}
                fetcher={TOKEN_METADATA_FETCHER}
              >
                <SendTransactionProvider priorityFee={400_201}>
                  <GambaProvider
                    __experimental_plugins={[
                      // Custom fee (1%)
                      // createCustomFeePlugin('<SOLANA ADDRESS>', .01),
                    ]}
                  >
                    <GambaPlatformProvider
                      creator={PLATFORM_CREATOR_ADDRESS}
                      defaultCreatorFee={PLATFORM_CREATOR_FEE}
                      defaultJackpotFee={PLATFORM_JACKPOT_FEE}
                      defaultPool={DEFAULT_POOL}
                    >
                      <App />
                    </GambaPlatformProvider>
                  </GambaProvider>
                </SendTransactionProvider>
              </TokenMetaProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </WagmiProvider>
    </BrowserRouter>
  )
}

root.render(<Root />)
