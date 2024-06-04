import Image from 'next/image'
import pentagonProfileSVG from '../../svgs/pentagon-profile.svg'
import doorOutSVG from '../../svgs/door-out.svg'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { formatAddress } from '@/utils/web3utils'

type Props = {
  walletAddress: string
}

const PopupMenu: FC<Props> = ({ walletAddress }) => {
  const router = useRouter()

  return (
    <div className='absolute top-full mt-2 right-0 p-4 cursor-auto flex flex-col space-y-6 bg-white border border-lightgrey rounded-12'>
      <div className='flex flex-col space-y-2 mr-6'>
        <span className='uppercase text-grey body6'>Wallet Address</span>
        <span className='body4'>{formatAddress(walletAddress)}</span>
      </div>
      <div className='flex flex-col'>
        <div
          className='cursor-pointer flex flex-row items-center space-x-2'
          onClick={() => router.push('/assets')}>
          <Image
            className='p-1 border border-lightgrey rounded-md'
            src={pentagonProfileSVG}
            alt='Profile icon'
            width={28}
            height={28}
          />
          <span className='body4'>My assets</span>
        </div>
        <hr className='my-3 border-d-1 border-lightgrey' />
        <div
          className='cursor-pointer flex flex-row items-center space-x-2'
          onClick={() => router.push('/logout')}>
          <Image
            className='p-1 border border-lightgrey rounded-md'
            src={doorOutSVG}
            alt='Log out icon'
            width={28}
            height={28}
          />
          <span className='body4'>Log out</span>
        </div>
      </div>
    </div>
  )
}

export default PopupMenu
