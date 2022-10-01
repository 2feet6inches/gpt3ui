import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html className="bg-slate-100 antialiased" lang="ja">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
