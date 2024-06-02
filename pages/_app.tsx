import { TweedFrontendSdkProvider } from '@paytweed/frontend-sdk-react'
import { TweedProvider } from '@paytweed/core-react'

import type { AppProps } from 'next/app'
import { useCallback } from 'react'
import './globals.css'
import { SDKv1_CHAIN_ID, SDKv2_NETWORK_ID } from '@/services/common'
import { TweedContextProvider } from '@/context/tweedContext'

export default function App({ Component }: AppProps) {
  const sendMessageToBackend = useCallback(async (message: string) => {
    const response = await fetch('/api/tweed/tweed', {
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    const { answer } = await response.json()
    return answer
  }, [])

  return (
    <div className='w-full min-h-screen'>
      {/* SDKv2 */}
      <TweedProvider
        applicationId={process.env.NEXT_PUBLIC_APPLICATION_ID!}
        options={{
          chains: [SDKv2_NETWORK_ID],
        }}>
        {/* SDKv1 */}
        <TweedFrontendSdkProvider
          sendMessageToBackend={sendMessageToBackend}
          defaultBlockchainIds={[SDKv1_CHAIN_ID]}>
          <TweedContextProvider>
            <Component />
          </TweedContextProvider>
        </TweedFrontendSdkProvider>
      </TweedProvider>
    </div>
  )
}
