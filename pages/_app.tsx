import '~/src/styles/index.css'
import 'focus-visible'

import { SSRProvider } from '@react-aria/ssr'
import { AppLayoutProps } from 'next/app'
import Script from 'next/script'

import { Layout } from '~/src/components/layout/Layout'
import usePageBetweenFocus from '~/src/hooks/usePageBetweenFocus'
import usePageView from '~/src/hooks/usePageView'
import useWindowNarrow from '~/src/hooks/useWindowNarrow'
import { GA_ID } from '~/src/utils/gtag'

function MyApp({ Component, pageProps }: AppLayoutProps) {
  useWindowNarrow()
  usePageBetweenFocus()
  usePageView()

  const layoutProps =
    typeof Component.layoutProps === 'function' ? Component.layoutProps(pageProps) : Component.layoutProps

  return (
    <SSRProvider>
      {GA_ID !== undefined && process.env.NODE_ENV === 'production' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <Script
            id="gtag"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });`,
            }}
          />
        </>
      )}
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
