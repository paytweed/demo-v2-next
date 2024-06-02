import Footer from '@/components/footer'
import Header from '@/components/header/header'
import { FC, PropsWithChildren } from 'react'

const LayoutPrimary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container mx-auto max-w-[720px] xl:max-w-[1200px] flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-grow p-2 sm:p-3 md:p-5 lg:p-6'>{children}</main>
      <Footer />
    </div>
  )
}

export default LayoutPrimary
