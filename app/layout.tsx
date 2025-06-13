import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WhiteZadow - IT Network Specialist',
  description: 'Professional IT networking and infrastructure solutions. Specializing in network design, server administration, and cybersecurity.',
  keywords: 'IT networking, network infrastructure, server administration, cybersecurity, cloud solutions',
  authors: [{ name: 'WhiteZadow' }],
  openGraph: {
    title: 'WhiteZadow - IT Network Specialist',
    description: 'Professional IT networking and infrastructure solutions',
    type: 'website',
    images: [
      {
        url: '/wzlogo-light-1.png',
        width: 1200,
        height: 630,
        alt: 'WhiteZadow Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhiteZadow - IT Network Specialist',
    description: 'Professional IT networking and infrastructure solutions',
    images: ['/wzlogo-light-1.png'],
  },
  icons: {
    icon: '/wzlogo-light-1.png',
    apple: '/wzlogo-light-1.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}