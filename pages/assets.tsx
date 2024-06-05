import { FC, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Chip from '@/components/chip'
import LayoutPrimary from '@/components/layouts/primary'
import arrowLeftSVG from '@/components/svgs/arrow-left.svg'
import imageViewsSVG from '@/components/svgs/image-views.svg'
import { useTweedContext } from '@/context/tweedContext'
import { formatAddress } from '@/utils/web3utils'
import CopyButton from '@/components/copy-button'

const MOCK_DATA = {
  ownedNfts: Array.from({ length: 5 }).map((_, index) => ({
    contract: {
      name: 'Mock NFT',
      symbol: 'MNFT',
      address: '0x1234567890abcdef1234567890abcdef12345678',
    },
    tokenUri: 'https://s6.imgcdn.dev/3i17B.png',
  })),
}

const AssetsPage: FC = () => {
  const { isLoading: sdkLoading, connectAndLoadWallet, walletAddress, walletNfts } = useTweedContext()

  useEffect(() => {
    if (sdkLoading || !connectAndLoadWallet) return
    connectAndLoadWallet()
  }, [sdkLoading, connectAndLoadWallet])

  const handleCopyWalletAddress = () => {
    if (!walletAddress) return
    navigator.clipboard.writeText(walletAddress)
  }

  return (
    <LayoutPrimary>
      <div className='w-full flex flex-col items-center justify-center pt-4 space-y-3'>
        <Chip text='Wallet Address' />
        <h2>{walletAddress ? formatAddress(walletAddress) : 'Connecting to Paytweed...'}</h2>
        <button
          className='p-1 mb-6 rounded-8 border border-white hover:border-blue transition'
          onClick={handleCopyWalletAddress}>
          <CopyButton size={20} />
        </button>

        {/* ~=~=~ ASSETS ~=~=~ */}
        <div className='pt-8 pb-3'>
          <Chip text='assets' />
        </div>

        {!walletNfts?.ownedNfts?.length ? (
          <div className='pt-3 flex flex-col items-center text-center'>
            <Image
              src={imageViewsSVG}
              alt='Image views icon'
              width={40}
              height={32}
            />
            <p className='pt-4'>
              Nothing here yet.
              <br />
              Explore our free mint and paid checkout options to see your purchase appear in your wallet!
            </p>
          </div>
        ) : (
          <div className={`gap-y-5 gap-x-2 sm:gap-x-5 justify-center flex flex-wrap`}>
            {walletNfts.ownedNfts.map((nft, index) => (
              <div
                key={index}
                className='flex flex-col items-center space-y-2'>
                <Image
                  className='rounded-16 max-w-[100px] sm:max-w-[160px] max-h-[100px] sm:max-h-[160px]'
                  src={
                    nft.tokenUri || nft.image.thumbnailUrl || nft.image.originalUrl || '' // TODO Placeholder
                  }
                  alt={nft.contract.name || nft.contract.symbol || nft.contract.address}
                  width={160}
                  height={160}
                />
                <p className='body4'>{nft.contract.name || nft.contract.symbol || nft.contract.address}</p>
              </div>
            ))}
          </div>
        )}
        {/* Go back */}
        <div className='pt-[40px]'>
          <Link
            href='/'
            className='flex flex-row items-center space-x-1 p-1 rounded-8 border border-white hover:border-blue transition'>
            <Image
              src={arrowLeftSVG}
              alt='Arrow left icon'
              width={14}
              height={14}
            />
            <p className='body5'>Go Back</p>
          </Link>
        </div>
      </div>
    </LayoutPrimary>
  )
}

export default AssetsPage
