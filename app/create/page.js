'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import PostForm from '@/components/PostForm'
import { createPost } from '@/lib/deta'

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (postData) => {
    setLoading(true)
    setError('')
    
    try {
      await createPost(postData)
      router.push('/')
    } catch (err) {
      setError('投稿の作成に失敗しました')
      console.error('投稿作成エラー:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}