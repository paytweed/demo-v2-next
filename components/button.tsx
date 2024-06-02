import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import Spinner from './loader-spinner/spinner'

const Button: FC<
  PropsWithChildren<{
    isLoading?: boolean
    extraAttributes?: ButtonHTMLAttributes<HTMLElement>
  }>
> = ({ children, isLoading, extraAttributes }) => {
  return (
    <button
      className='bg-black hover:bg-blue focus:bg-darkblue text-white body4 py-2 px-4 w-[150px] h-[36px] rounded-8 transition'
      {...extraAttributes}>
      {isLoading ? (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
export default Button
