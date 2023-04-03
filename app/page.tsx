import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>

      <div>
        <h1>
          This space for rent
        </h1>

        <a href='/users'>
          <h2>Click here to go to player compare</h2>
        </a>

      </div>

    </main>
  )
}
