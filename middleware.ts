// https://nextjs.org/docs/pages/building-your-application/routing/middleware

import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

// Checks the Authorization header for a Basic Auth token
// and validates it against the expected user and password.
// In case not found or invalid, it redirects to a route that sends a header 'Basic realm="Secure Area"' and a 401 status code.

export const config: MiddlewareConfig = {
  matcher: ['/', '/(.*)', '/api/tweed/(.*)'],
}

const validateBasicAuth = (req: NextRequest) => {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'tweed' && pwd === (process.env.BASIC_AUTH_PASSWORD ?? 'tweed-default')) {
      return true
    }
  }
}

export function middleware(req: NextRequest) {
  if (validateBasicAuth(req)) {
    // Continue execution flow
    return NextResponse.next()
  }

  // Redirect to a route that returns a 401 status code...
  const url = req.nextUrl
  url.pathname = '/api/require-auth'
  return NextResponse.rewrite(url)
}
