import Image from 'next/image'
import { FC } from 'react'

type Props = {
  text: string
  iconSrc?: string
}

const Chip: FC<Props> = ({ text, iconSrc }) => {
  return (
    <div className='rounded-16 px-3 py-1 bg-lightblue text-blue flex flex-row items-center'>
      {iconSrc && (
        <Image
          src={iconSrc}
          alt='Chip icon'
          width={14}
          height={14}
          className='mr-2'
        />
      )}
      <span className='uppercase body4'>{text}</span>
    </div>
  )
}

export default Chip
