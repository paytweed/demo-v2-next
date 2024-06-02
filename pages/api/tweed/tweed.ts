import { NextApiRequest, NextApiResponse } from 'next'
import { getTweedSDK } from '@/services/tweed.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tweedClient = await getTweedSDK()

  const userId = '1' // Can be any string to allow for multiple wallet per email
  const userEmail = 'demo@paytweed.com' // Should be client's email

  const answer = await tweedClient.handleMessageFromFrontend(req.body.message, userId, userEmail)
  res.send({ answer })
}
