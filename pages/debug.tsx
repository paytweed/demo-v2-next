import { useTweedContext } from '@/context/tweedContext'
import { SDKv1_CHAIN_ID, SDKv2_NETWORK_ID } from '@/services/common'

export default function Index() {
  const { createBuyNftMethod, connectAndLoadWallet, isLoading, logout, walletAddress } = useTweedContext()

  const handleLogout = () => {
    logout()
  }
  const handleLogin = () => {
    connectAndLoadWallet()
  }

  const handleNFTCheckoutFreemint = () => {
    if (!walletAddress) return console.error('No SDKv2 wallet address!')
    createBuyNftMethod('demo-freemint')(walletAddress)
  }
  const handleNFTCheckoutPaidmintERC20 = () => {
    if (!walletAddress) return console.error('No SDKv2 wallet address!')
    createBuyNftMethod('demo-paidmint-erc20')(walletAddress)
  }
  const handleNFTCheckoutPaidmintNative = () => {
    if (!walletAddress) return console.error('No SDKv2 wallet address!')
    createBuyNftMethod('demo-paidmint-native')(walletAddress)
  }

  return (
    <div className='bg-black text-white flex flex-col justify-center items-center w-full gap-6 p-12'>
      <h1>Debug info page</h1>

      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}>
          <p>{'SDKv1 Chain ID: ' + SDKv1_CHAIN_ID}</p>
          <p>{`SDKv1 Wallet is ready: ${!isLoading}`}</p>

          <br />
          <p>{`SDKv2 Network ID: ${SDKv2_NETWORK_ID}`}</p>
          <p>{isLoading ? 'Loading SDKv2 wallet address..' : `SDKv2 Wallet address: ${walletAddress}`}</p>
        </div>
      </div>
      <div></div>
      <div className='flex items-center justify-center  p-4'>
        <button
          className='bg-blue hover:bg-darkblue text-white font-bold py-2 px-4 rounded-full mx-2'
          onClick={handleLogout}>
          Logout
        </button>
        <button
          className='bg-blue hover:bg-darkblue text-white font-bold py-2 px-4 rounded-full mx-2'
          onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className='flex items-center justify-center  p-4'>
        <button
          className={
            'bg-blue hover:bg-darkblue text-white font-bold py-2 px-4 rounded-full mx-2' +
            (walletAddress ? '' : ' cursor-not-allowed')
          }
          disabled={!walletAddress}
          onClick={handleNFTCheckoutPaidmintERC20}>
          NFT Checkout - Paidmint ERC20
        </button>
        <button
          className={
            'bg-blue hover:bg-darkblue text-white font-bold py-2 px-4 rounded-full mx-2' +
            (walletAddress ? '' : ' cursor-not-allowed')
          }
          disabled={!walletAddress}
          onClick={handleNFTCheckoutPaidmintNative}>
          NFT Checkout - Paidmint Native
        </button>
        <button
          className={
            'bg-blue hover:bg-darkblue text-white font-bold py-2 px-4 rounded-full mx-2' +
            (walletAddress ? '' : ' cursor-not-allowed')
          }
          disabled={!walletAddress}
          onClick={handleNFTCheckoutFreemint}>
          NFT Checkout - Freemint
        </button>
      </div>
    </div>
  )
}
