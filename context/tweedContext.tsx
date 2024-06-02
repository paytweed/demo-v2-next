import { SDKv2_NETWORK_ID } from '@/services/common'
import { useAuth, useTweed, useWeb3 } from '@paytweed/core-react'
import { hooks } from '@paytweed/frontend-sdk-react'
import { OwnedNftsResponse } from 'alchemy-sdk'
import { BrowserProvider } from 'ethers'
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

export type NFTId = 'demo-freemint' | 'demo-paidmint-native' | 'demo-paidmint-erc20'

/**
 * In this react context we are combining the SDKv1 and SDKv2 usages.
 * We are using SDKv1 for Claiming and SDKv2 for wallet connection and NFT fetching.
 */

interface TweedContextValue {
  createV1Wallet: () => void
  createBuyNftMethod: (nftId: NFTId) => (toWalletAddress: string, onClose?: () => void) => void
  connectAndLoadWallet: () => Promise<string | undefined>
  getWalletAddressOrConnect: () => Promise<string>
  isLoading: boolean
  logout: () => Promise<void>
  walletAddress: string | undefined
  walletNfts: OwnedNftsResponse | undefined
}

const TweedContext = createContext<TweedContextValue | undefined>(undefined)

export const useTweedContext = (): TweedContextValue => {
  const context = useContext(TweedContext)
  if (!context) {
    throw new Error('useTweedContext must be used within a TweedContextProvider')
  }
  return context
}

export const TweedContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // ~=~=~=~=~=~
  // SDKv1
  const sdkv1 = hooks.useTweedFrontendSDK()

  const [walletV1Ready, setWalletV1Ready] = useState(false)
  useEffect(() => {
    if (!sdkv1) return

    console.log('Checking for SDKv1 wallet address...')
    sdkv1.wallet.exists().then((res) => {
      if (res) {
        setWalletV1Ready(true)
        return
      }

      console.log('No wallet exists for v1, creating...')
      createV1Wallet()
    })
  }, [sdkv1])

  const createV1Wallet = () => {
    console.log('Creating SDKv1 wallet...')
    sdkv1.wallet
      .create({
        callbacks: {
          onSuccess: () => {
            console.log('SDKv1 wallet created!')
            setWalletV1Ready(true)
          },
          onError: (error) => {
            console.error('Error creating SDKv1 wallet:', error)
          },
        },
      })
      .finally(() => {
        console.log('SDKv1 wallet creation finished!')
      })
  }

  const createBuyNftMethod = (nftId: NFTId) => (toWalletAddress: string, onClose?: () => void) => {
    try {
      sdkv1.nft.buyWithFiat({
        nftId,
        toWalletAddress,
        customMintParams: {},
        data: {},
        callbacks: {
          onSuccess: (data) => {
            console.log('[buyNft] Freemint success!', data)
          },
          onError: (error) => {
            console.error('[buyNft] Freemint error!', error)
          },
          onClose,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  // ~=~=~=~=~=~
  // SDKv2
  const { client, loading } = useTweed()
  const { getEthereumProvider } = useWeb3()
  const { isAuthenticated, connect, logout } = useAuth()

  const [walletAddress, setWalletAddress] = React.useState<string>()
  const [walletNfts, setWalletNfts] = React.useState<OwnedNftsResponse>()

  useEffect(() => {
    if (!walletAddress) return

    console.log('Fetching user NFTs...')
    fetch('/api/tweed/get-nfts', {
      method: 'POST',
      body: JSON.stringify({ address: walletAddress }),
    })
      .then((res) => res.json())
      .then((nfts) => {
        console.log('NFTs response:', nfts)
        setWalletNfts(nfts)
      })
      .catch((err) => {
        console.error('Error fetching user NFTs:', err)
      })
  }, [walletAddress])

  async function loadWalletAddress() {
    if (!client) {
      console.warn('No client, did you wait for it to load?')
      return
    }

    try {
      const provider = await getEthereumProvider(SDKv2_NETWORK_ID)
      const web3provider = new BrowserProvider(provider)

      try {
        const signer = await web3provider.getSigner()
        const userAddress = await signer.getAddress()
        console.log('Loaded user address:', userAddress)
        setWalletAddress(userAddress)
        return userAddress
      } catch (error) {
        console.error('Error getting user address:', error)
      }
    } catch (err) {
      console.error('Error while getting provider from SDKv2:', err)
    }
  }

  async function connectAndLoadWallet() {
    if (!client) return
    if (!isAuthenticated) {
      console.log('Connecting to SDKv2...')
      await connect({ oauth: true })
      console.log('Connected to SDKv2!')
    } else {
      console.log('Already connected to SDKv2!')
    }

    return loadWalletAddress()
  }

  const getWalletAddressOrConnect = async () => {
    if (walletAddress) {
      return walletAddress
    }
    console.error('No wallet address, connecting...')
    return connectAndLoadWallet().then((address) => {
      if (!address) throw Error('No wallet address!')
      return address
    })
  }

  return (
    <TweedContext.Provider
      value={{
        createV1Wallet,
        createBuyNftMethod,
        connectAndLoadWallet,
        getWalletAddressOrConnect,
        isLoading: loading || !walletV1Ready,
        logout,
        walletAddress,
        walletNfts,
      }}>
      {children}
    </TweedContext.Provider>
  )
}
