import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata = {
  title: 'Aura News | Premium Tech & AI Insights',
  description: 'The minimalist tech news aggregator for the future. Stay updated on the latest AI breakthroughs, Web Design trends, and Crypto movements with Aura News.',
  keywords: ['tech news', 'AI news', 'artificial intelligence', 'crypto news', 'web design', 'technology', 'aura news'],
  authors: [{ name: 'Aura News' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    title: 'Aura News | Premium Tech & AI Insights',
    description: 'Stay updated on AI, Web Design, and Crypto with Aura News — the minimalist tech news aggregator built for the future.',
    siteName: 'Aura News',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura News | Premium Tech & AI Insights',
    description: 'Stay updated on AI, Web Design, and Crypto with Aura News.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7322019754286753"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
