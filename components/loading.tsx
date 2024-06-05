import Image from 'next/image'
import tweedLogoSVG from '@/components/svgs/tweed-icon.svg'

const Loader = () => {
  return (
    <Image
      className={'animate-breathe'}
      src={tweedLogoSVG}
      alt='Tweed logo'
      width={40}
      height={40}
    />
  )
}
export default Loader
