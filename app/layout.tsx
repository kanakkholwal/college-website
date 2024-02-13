import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Provider, ThemeProvider } from "./client-provider";

import './globals.css';

// import { Urbanist } from 'next/font/google';
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin-ext', 'latin'],
    display: 'swap',
    adjustFontFallback: false,
    variable: '--plus-jakarta',
    fallback: ['system-ui', 'sans-serif']
})


// const font = Urbanist({
//     subsets: ['latin'],
//     preload: true,
//     display: 'swap',
//     weight: ["200","300", "400", "500", "600", '700', "800"],
// })

export const metadata: Metadata = {
    title: 'NITH Portal',
    description: 'NITH Portal is a platform for students of NITH to get all the resources at one place.',
    applicationName: 'NITH Portal',
    authors: [{ name: 'Kanak Kholwal', url: 'https://kanakkholwal.eu.org' }],
    creator: 'Kanak Kholwal',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://nith.eu.org'),
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: './manifest.json',

}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta name="google-adsense-account" content="ca-pub-2329686175069611"/>
            </head>
            <body className={font.className + " min-h-screen selection:bg-primary/10 selection:text-primary dark:bg-gray-900"}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    themes={['light', 'dark']}
                >
                    <Provider>{children}</Provider>

                </ThemeProvider>
                <GoogleAnalytics gaId="G-SC4TQQ5PCW" />
            </body>
        </html>
    )
}
