import './globals.scss'
import Layout from '@/components/Layout'
import Proiders from './providers';
import Script from 'next/script';
import TawkToChat from '@/components/TawkToChat';


export const metadata = {
  title: 'AUDIOSTUDIOS',
  description: 'AUDIOSTUDIOS',
}

async function getCityList() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/city-list`,{ cache: 'no-store' })
    return res.json();
  } catch (e) {
    return []
  }
}

async function gsContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/global-settings`,{ cache: 'no-store' })
  return res.json();
}


export default async function RootLayout({ children }) {
  //console.log("children children",children)
  const cityListData = await getCityList();

  const gsData = await gsContent();

  // console.log("gsData",gsData)
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="cir1qhQDFJNlQhUBYOXXRXLlDe6AfIgUnYIVdTZzcqM" />
      <meta name="facebook-domain-verification" content="2d6tptmg4ltmer83fe8n4c4j7zkcky" />
       {/* Google Tag Manager  */}

    <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE}');`}}></Script>

      {/* End Google Tag Manager  */}


      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

      {/* Google tag (gtag.js) Google Analytics */}
      <Script id='google-tag'
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        {/* Google tag (gtag.js) */}

      {/* {gsData.header_tags.value} */}
      {gsData.header_tags.value && (
        <div dangerouslySetInnerHTML={{ __html: gsData.header_tags.value }} />
      )}
      </head>
      
      <body suppressHydrationWarning={true}>
        
      {gsData.body_tags.value && (
        <div dangerouslySetInnerHTML={{ __html: gsData.body_tags.value }} />
      )}

      {/* Google Tag Manager (noscript) */}
      <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
      {/* End Google Tag Manager (noscript) */}



      <Proiders>
        <Layout gsData={gsData} cityListData={cityListData || []}>
        {children}
        </Layout>
        </Proiders>

        <footer>
        {gsData.footer_tags.value && (
        <div dangerouslySetInnerHTML={{ __html: gsData.footer_tags.value }} />
      )}
        </footer>
        
        </body>
            

    </html>
  )
}
