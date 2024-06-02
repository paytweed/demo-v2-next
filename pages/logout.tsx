import { useTweedContext } from '@/context/tweedContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()
  const { logout } = useTweedContext()

  useEffect(() => {
    if (!logout || !router) return

    logout().finally(() => {
      router.push('/')
    })
  }, [router, logout])

  return <></>
}
