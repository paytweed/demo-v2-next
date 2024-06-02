import { Alchemy, Network } from 'alchemy-sdk'

const config = {
  apiKey: process.env.ALCHEMY_API_KEY!,
  network: Network.MATIC_AMOY,
}
export const alchemy = new Alchemy(config)
