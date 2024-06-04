import { TweedBackendSDK } from '@paytweed/backend-sdk'
import { SDKv1_CHAIN_ID } from './common'

/**
 * In this file we define several things:
 * - A connection to Tweed SDKv1
 * - A mapping of NFT purchase data for different NFTs
 *   -> For the demo, we have 3 NFTs:
 *     1. A free mint NFT
 *     2. A paid mint NFT using native currency
 *     3. A paid mint NFT using an ERC20 token
 *
 * ## Notes:
 * - The NFT contract address and ABI are fixed and hardcoded for this demo.
 * - For the ERC20 token, we use a fake USDC token address.
 *
 */

// A fake USDC token which we will use for the paid mint NFT
const FAKE_USDC_CONTRACT_ADDRESS = '0xE5448846F1E4c97Ef91486159aDA8a193A3FE0a8' as const

// A dedicated NFT Contract that Tweed's dev team have deployed specifically for this demo.
const DEMO_NFT_CONTRACT_ADDRESS = '0xf59F8537C9864C9840d8BC0bEC77AbD649Cad1A5' as const
const DEMO_NFT_CONTRACT_ABI_FREE = 'safeMint(toAddress address, tokenUri string)' as const
const DEMO_NFT_CONTRACT_ABI_PAID_ERC20 = 'safeMintToken(toAddress address, tokenUri string)' as const
const DEMO_NFT_CONTRACT_ABI_PAID_NATIVE = 'safeMintNative(toAddress address, tokenUri string)' as const

let _client: Awaited<ReturnType<typeof TweedBackendSDK.setup>> | null = null

type NftPurchaseBackendPayload = Awaited<
  ReturnType<NonNullable<NonNullable<Parameters<typeof TweedBackendSDK.setup>[0]['callbacks']>['getNftPurchaseData']>>
>

const tokenCheckoutCommon = {
  fiatCurrencyId: 'USD',
  contractAddress: DEMO_NFT_CONTRACT_ADDRESS,
  chain: SDKv1_CHAIN_ID,
  description: "Non-fungible token for demonstration of Tweed's capabilities",
}

const tokenCheckoutVariants: Record<string, NftPurchaseBackendPayload> = {
  'demo-freemint': {
    ...tokenCheckoutCommon,
    nftId: 'demo-freemint',
    title: 'Pink Cat',
    tokenUri: 'https://s6.imgcdn.dev/3iaCq.png', // Pinky
    priceInCrypto: '0',
    tokenContractAddress: undefined, // No token address for freemint
    abi: DEMO_NFT_CONTRACT_ABI_FREE,
  },
  'demo-paidmint-native': {
    ...tokenCheckoutCommon,
    nftId: 'demo-paidmint-native',
    title: 'Blue Cat',
    tokenUri: 'https://s6.imgcdn.dev/3i17B.png', // Bluey
    priceInCrypto: String(1e16), // Native mint function requires 0.01 MATIC
    description: "Non-fungible token for demonstration of Tweed's capabilities",
    abi: DEMO_NFT_CONTRACT_ABI_PAID_NATIVE,
  },
  'demo-paidmint-erc20': {
    ...tokenCheckoutCommon,
    nftId: 'demo-paidmint-erc20',
    title: 'Blue Cat',
    tokenUri: 'https://s6.imgcdn.dev/3i17B.png', // Bluey
    priceInCrypto: String(100e18), // 100 fake USDC token
    tokenContractAddress: FAKE_USDC_CONTRACT_ADDRESS,
    abi: DEMO_NFT_CONTRACT_ABI_PAID_ERC20,
  },
}

export const getTweedSDK = async () => {
  if (_client) return _client

  console.log('[tweed.service] Setting up Tweed SDK')
  _client = await TweedBackendSDK.setup({
    apiKey: process.env.TWEED_API_KEY!,
    apiSecret: process.env.TWEED_API_SECRET!,
    defaultBlockchainIds: [SDKv1_CHAIN_ID],
    callbacks: {
      getNftPurchaseData: async ({ nftId }) => tokenCheckoutVariants[nftId],
    },
  })
  console.log('[tweed.service] Tweed SDK initialized successfully')
  return _client
}
