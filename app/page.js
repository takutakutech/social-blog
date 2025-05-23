'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import PostCard from '@/components/Postcard' // 大文字？
import SearchAndFilter from '@/components/SearchAndFilter'
import { getPosts } from '@/lib/deta' // deta→スペルミスった笑
import { Search } from 'lucide-react'

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error('投稿の読み込みに失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

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
        <SearchAndFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">該当する投稿が見つかりませんでした</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}