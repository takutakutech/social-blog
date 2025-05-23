'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import PostCard from '@/components/Postcard'
import { getMyPosts, getCurrentUser } from '@/lib/deta'
import { User, Edit3 } from 'lucide-react'

export default function MyPage() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getCurrentUser()
        const postsData = await getMyPosts()
        setUser(userData)
        setPosts(postsData)
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-500">投稿数: {posts.length}件</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">あなたの投稿</h2>
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Edit3 className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500 mb-4">まだ投稿がありません</p>
              <button 
                onClick={() => router.push('/create')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                最初の投稿を作成
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}