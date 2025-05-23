'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('認証コールバックエラー:', error)
          router.push('/login?error=auth_failed')
          return
        }

        if (data.session) {
          console.log('認証成功:', data.session.user.email)
          router.push('/')
        } else {
          console.log('セッションなし')
          router.push('/login')
        }
      } catch (error) {
        console.error('認証処理エラー:', error)
        router.push('/login?error=auth_failed')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">認証処理中...</p>
      </div>
    </div>
  )
}