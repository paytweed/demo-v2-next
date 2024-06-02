import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

import WalletSVG from '../../svgs/wallet.svg'
import ArrowUpSVG from '../../svgs/arrow-up.svg'
import ArrowDownSVG from '../../svgs/arrow-down.svg'
import PopupMenu from './popup-menu'

type Props = {
  walletAddress: string
}

const Dropdown: FC<Props> = ({ walletAddress }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const openDropdown = () => {
    setDropdownOpen(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={dropdownRef}
      className='relative flex items-center cursor-pointer space-x-2 py-1 px-3 border border-blue hover:border-darkblue rounded-12'
      onClick={openDropdown}>
      <Image
        src={WalletSVG}
        alt='Wallet icon'
        width={20}
        height={20}
      />
      <span>My wallet</span>
      {dropdownOpen ? (
        <Image
          src={ArrowUpSVG}
          alt='Arrow up icon'
          width={20}
          height={20}
        />
      ) : (
        <Image
          src={ArrowDownSVG}
          alt='Arrow down icon'
          width={20}
          height={20}
        />
      )}
      {dropdownOpen && <PopupMenu walletAddress={walletAddress} />}
    </div>
  )
}
export default Dropdown
