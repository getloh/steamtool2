import localFont from 'next/font/local'
import './globals.css'

const poppins = localFont({
  src: [
    {
      path: '../public/fonts/Poppins-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/Poppins-Medium.ttf',
      weight: '500'
    },
    {
      path: '../public/fonts/Poppins-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../public/fonts/Poppins-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-poppins'
})

export const metadata = {
  title: "Steve's Steam Tool",
  description: 'Find games to play with your friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <body className={`overflow-x-hidden ${poppins.variable} font-sans`}>{children}</body>
    </html>
  )
}
