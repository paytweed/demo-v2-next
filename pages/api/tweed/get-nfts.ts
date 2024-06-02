import { alchemy } from '@/services/alchemy.service'
import { NextApiRequest, NextApiResponse } from 'next'

const parseAddress = (body: string) => {
  try {
    return JSON.parse(body).address
  } catch (error) {
    return null
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const address = parseAddress(req.body)
  if (!address) {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  try {
    const nfts = await alchemy.nft.getNftsForOwner(address)

    return res.status(200).json(nfts)
  } catch (error) {
    console.error('Error fetching NFTs', error)
    return res.status(500).json({ error: 'Error fetching NFTs' })
  }
}
