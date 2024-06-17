// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

// This file runs when the app starts up and can be used to validate environment variables or run other startup tasks.

const validateRequiredEnvVarsDefined = () => {
  if (!process.env.NEXT_PUBLIC_APPLICATION_ID) {
    throw new Error('NEXT_PUBLIC_APPLICATION_ID is not defined')
  }
  if (!process.env.BASIC_AUTH_PASSWORD) {
    throw new Error('BASIC_AUTH_PASSWORD is not set')
  }
  if (!process.env.TWEED_API_KEY) {
    throw new Error('TWEED_API_KEY is not defined')
  }
  if (!process.env.TWEED_API_SECRET) {
    throw new Error('TWEED_API_SECRET is not defined')
  }
}

export function register() {
  validateRequiredEnvVarsDefined()
}
