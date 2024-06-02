import Dropdown from './my-wallet/dropdown'
import TweedSVG from '../svgs/tweed.svg'
import Image from 'next/image'
import Button from '../button'
import { useState } from 'react'
import Link from 'next/link'
import { useTweedContext } from '@/context/tweedContext'

export default function Header() {
  const [isLoading, setIsLoading] = useState(false)

  const { connectAndLoadWallet, walletAddress, isLoading: sdkLoading } = useTweedContext()

  const handleCreateWallet = () => {
    setIsLoading(true)
    connectAndLoadWallet().finally(() => setIsLoading(false))
  }

  return (
    <header className='bg-white px-4 py-3 flex justify-between'>
      <Link href={'/'}>
        <Image
          src={TweedSVG}
          alt='Tweed logo'
          width={105}
          height={28}
        />
      </Link>
      {walletAddress ? (
        <Dropdown walletAddress={walletAddress} />
      ) : (
        <Button
          isLoading={isLoading || sdkLoading}
          extraAttributes={{
            onClick: handleCreateWallet,
          }}>
          {'Create a wallet'}
        </Button>
      )}
    </header>
  )
}
