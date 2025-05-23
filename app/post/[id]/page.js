'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import PostCard from '@/components/Postcard'
import { getPostById } from '@/lib/deta'
import { ArrowLeft } from 'lucide-react'

export default function PostDetailPage({ params }) {
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // paramsをunwrapする
  const unwrappedParams = use(params)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPostById(unwrappedParams.id)
        if (data) {
          setPost(data)
        } else {
          setError('投稿が見つかりませんでした')
        }
      } catch (err) {
        setError('投稿の読み込みに失敗しました')
        console.error('投稿読み込みエラー:', err)
      } finally {
        setLoading(false)
      }
    }
    
    if (unwrappedParams.id) {
      loadPost()
    }
  }, [unwrappedParams.id])

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </button>
        {post && <PostCard post={post} isDetail={true} />}
      </div>
    </div>
  )
}