import Chip from '@/components/chip'
import LayoutPrimary from '@/components/layouts/primary'
import NFTCard from '@/components/nft-card'
import tweedIconSVG from '@/components/svgs/tweed-icon.svg'
import { useState } from 'react'
import FloatingTestCardInfo from '@/components/floating-test-card-info'

export default function Index() {
  const [isStripeDemoCardPopupShown, setIsStripeDemoCardPopupShown] = useState(false)

  return (
    <LayoutPrimary>
      {isStripeDemoCardPopupShown && <FloatingTestCardInfo />}
      <div className='flex flex-col xl:flex-row items-center justify-center mt-2'>
        {/* Left side */}
        <section className='xl:w-1/2 flex flex-col space-y-3 items-center xl:items-start text-center xl:text-left pb-6 xl:pb-0 px-1 xl:pl-0 xl:pr-6'>
          <Chip
            text='Onboard the world'
            iconSrc={tweedIconSVG}
          />
          <h1>Experience seamless token checkout and embedded wallet creation</h1>
          <p className='body2'>
            Onboard users compliantly with self-custodial wallets.
            <br />
            Monetize them with frictionless fiat onramp.
          </p>
        </section>
        {/* Right side */}
        <section className='flex flex-col justify-center items-center space-y-4 w-full xl:w-1/2'>
          {/* Free Pink */}
          <NFTCard
            nftId='demo-freemint'
            imgUrl='/pinky.png'
            headText='Free minting'
            description='Let your users claim tokens for free, and never worry about gas fees with our freemint solution.'
            buttonText='Mint for free'
          />
          {/* Paid Blue */}
          <NFTCard
            nftId='demo-paidmint-erc20'
            imgUrl='/bluey.png'
            headText='Paid checkout'
            description='Broaden your audience by letting your users pay with debit or credit card. No crypto required.'
            buttonText='Buy now'
            setIsWidgetInProgress={setIsStripeDemoCardPopupShown}
          />
        </section>
      </div>
    </LayoutPrimary>
  )
}
