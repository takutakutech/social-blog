import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SocialBlog - ソーシャルブログアプリ',
  description: 'Next.jsで作られたソーシャルブログアプリケーション',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}