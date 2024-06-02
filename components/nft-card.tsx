import Image from 'next/image'
import Button from './button'
import { useState } from 'react'
import { NFTId, useTweedContext } from '@/context/tweedContext'

const NFTCard = ({
  nftId,
  imgUrl,
  headText,
  buttonText,
  description,
  setIsWidgetInProgress,
}: {
  nftId: NFTId
  imgUrl: string
  headText: string
  buttonText: string
  description: string
  setIsWidgetInProgress?: (isWidgetShown: boolean) => void
}) => {
  const [isMintFlowInProgress, setIsMintFlowInProgress] = useState(false)

  const { createBuyNftMethod, getWalletAddressOrConnect, isLoading } = useTweedContext()

  const handleClickBuy = () => {
    console.log('Buy NFT clicked!')
    setIsMintFlowInProgress(true)
    getWalletAddressOrConnect()
      .then((walletAddress) => {
        console.log('Showing mint & claim widget!')
        setIsMintFlowInProgress(true)
        setIsWidgetInProgress && setIsWidgetInProgress(true)
        createBuyNftMethod(nftId)(walletAddress, () => {
          console.log('Mint & claim widget closed!')
          setIsMintFlowInProgress(false)
          setIsWidgetInProgress && setIsWidgetInProgress(false)
        })
      })
      .catch(() => setIsMintFlowInProgress(false))
  }

  return (
    <div className='w-auto md:w-[580px] flex items-center bg-lightblue p-4 md:p-5 rounded-16 h-[200px]'>
      <Image
        src={imgUrl}
        alt={headText}
        width={160}
        height={160}
        className='rounded-lg mr-6 w-[80px] mini:w-[140px] md:w-[160px]'
      />
      <div
      // className="py-10"
      >
        <p className='body2 mb-1'>{headText}</p>
        <p className='body5 mb-4'>{description}</p>
        <Button
          isLoading={isLoading || isMintFlowInProgress}
          extraAttributes={{ onClick: handleClickBuy }}>
          {buttonText}
        </Button>
        <p className='body6 text-grey mt-2'>
          By continuing, you agree to{' '}
          <a
            href='#'
            className='underline'>
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  )
}
export default NFTCard
