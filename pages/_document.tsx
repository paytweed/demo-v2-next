import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='icon'
          href='/tweed-logo-dark.ico'
          sizes='any'
        />
        <link
          rel='apple-touch-icon'
          href='/tweed-logo-dark.ico'
          type='image/x-icon'
          sizes='any'
        />
        <title>Tweed Demo</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
