import Image from 'next/image'
import arrowRightUpSVG from './svgs/arrow-right-up.svg'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='px-7 py-3 pt-8'>
      <div className='gap-y-2 flex flex-col md:flex-row items-center justify-between body5'>
        <div className='w-full container md:w-auto flex space-x-8 justify-between'>
          <Link
            target="_blank"
            href='https://docs.paytweed.com/'
            className='hover:underline'>
            Docs
          </Link>
          <Link
            target="_blank"
            href='#'
            className='hover:underline'>
            Terms of Service
          </Link>
          <Link
            target="_blank"
            href='https://dashboard.paytweed.com/'
            className='hover:underline items-center flex gap-x-1'>
            Developer Console
            <Image
              src={arrowRightUpSVG}
              alt='Arrow icon'
              width={16}
              height={16}
            />
          </Link>
        </div>
        <div>© Tweed 2024. All rights reserved.</div>
      </div>
    </footer>
  )
}
