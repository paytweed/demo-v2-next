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
          href='/tweed-logo-dark.ico?v=1'
          type='image/x-icon'
          sizes='any'
        />
        <title>Tweed Demo</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
      <meta name="dscvr:canvas:version" content="vNext">
      <meta name="og:image" content="https://my-canvas.com/preview-image.png">
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
