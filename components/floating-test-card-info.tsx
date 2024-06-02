import Image from 'next/image'
import CopySVG from '@/components/svgs/copy.svg'

const TEST_CARD_INFO = {
  cardNumber: '4242 4242 4242 4242',
  expiry: '04/44',
  cvv: '444',
} as const

const CopiableText = ({ text }: { text: string }) => (
  <div
    onClick={() => {
      navigator.clipboard.writeText(text.replaceAll(' ', ''))
    }}
    className='flex flex-row items-center px-2 py-1 gap-2 border rounded-8 hover:border-blue focus:border-darkblue transition cursor-pointer'>
    <p className='body5'>{text}</p>
    <Image
      src={CopySVG}
      alt='Copy icon'
      width={16}
      height={16}
    />
  </div>
)

const FloatingTestCardInfo = () => {
  return (
    <div
      className='fixed bottom-[50px] inset-x-0 flex items-center justify-center'
      style={{ zIndex: 22222 }} // Tweed widget is zindex=10k
    >
      <div className='bg-white p-2 rounded-16 border-2'>
        {/* <!-- Content goes here --> */}
        <div className='flex flex-col md:flex-row items-center gap-x-4 gap-y-2'>
          <p className='px-1 body5'>For your convenience, use the following card details</p>
          <div className='flex flex-row gap-1'>
            <CopiableText text={TEST_CARD_INFO.cardNumber} />
            <CopiableText text={TEST_CARD_INFO.expiry} />
            <CopiableText text={TEST_CARD_INFO.cvv} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default FloatingTestCardInfo
