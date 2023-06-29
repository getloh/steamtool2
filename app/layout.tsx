import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'react-hot-toast'

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
      <body className={`overflow-x-hidden ${poppins.variable} font-sans`}>
        <Toaster 
        position="bottom-right"
        reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        style: {
                            background: 'rgb(8, 47, 73)',
                          },
                    },
                    error: {
                        style: {
                            background: '#4f1919',
                          },
                    },
                }}
        />
        {children}
        </body>
    </html>
  )
}
