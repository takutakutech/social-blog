'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Home, User, Plus, Menu, X, LogOut } from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  // useAuthから値を取得（エラーハンドリング付き）
  let user, loading, signOut
  try {
    const authData = useAuth()
    user = authData.user
    loading = authData.loading || false
    signOut = authData.signOut
  } catch (error) {
    console.error('Auth context error:', error)
    // エラーの場合はデフォルト値を設定
    user = null
    loading = false
    signOut = () => {}
  }

  const isActive = (path) => pathname === path

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('サインアウトエラー:', error)
    }
  }

  // 認証状態の確認中
  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialBlog
              </div>
            </div>
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  // 一時的にログインチェックをコメントアウト（デバッグ用）
  /*
  if (!user && pathname !== '/login') {
    router.push('/login')
    return null
  }
  */

  // ログインページの場合はナビゲーションを表示しない
  if (pathname === '/login') {
    return null
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SocialBlog
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}>
                <Home className="w-4 h-4 inline mr-2" />
                ホーム
              </Link>
              <Link href="/mypage" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/mypage') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}>
                <User className="w-4 h-4 inline mr-2" />
                マイページ
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/create" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-sm">
              <Plus className="w-4 h-4 inline mr-2" />
              投稿
            </Link>
            
            <div className="flex items-center space-x-3">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'ユーザー'}
                </p>
              </div>
              
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="サインアウト"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}>
                <Home className="w-4 h-4 inline mr-2" />
                ホーム
              </Link>
              <Link href="/mypage" className="text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}>
                <User className="w-4 h-4 inline mr-2" />
                マイページ
              </Link>
              <button 
                onClick={() => {
                  handleSignOut()
                  setIsMenuOpen(false)
                }}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                サインアウト
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}