import Image from 'next/image'
import CopySVG from '@/components/svgs/copy.svg'
import CheckmarkSVG from '@/components/svgs/checkmark.svg'
import { FC, useState } from 'react'

const CopyButton: FC<{ size: number }> = ({ size }) => {
  const [clicked, setClicked] = useState(false)

  const click = () => {
    setClicked(true)
    setTimeout(() => {
      setClicked(false)
    }, 2000)
  }

  if (clicked) {
    return (
      <Image
        onClick={click}
        src={CheckmarkSVG}
        alt='Checkmark icon'
        width={size}
        height={size}
      />
    )
  } else {
    return (
      <Image
        onClick={click}
        src={CopySVG}
        alt='Copy icon'
        width={size}
        height={size}
      />
    )
  }
}
export default CopyButton
