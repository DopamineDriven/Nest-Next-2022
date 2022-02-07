import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

class NestNext extends Document<DocumentContext & DocumentInitialProps> {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link href='/_meta/favicon.ico' rel='shortcut icon' />
          <link href='/_meta/site.webmanifest' rel='manifest' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/_meta/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/_meta/favicon-16x16.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/_meta/favicon-32x32.png'
          />
          <link
            rel='mask-icon'
            href='/_meta/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />
          <meta name='msapplication-config' content='/_meta/browserconfig.xml' />
        </Head>
        <body className='loading'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NestNext;
