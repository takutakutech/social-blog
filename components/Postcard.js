'use client'

import Link from 'next/link'
import { Heart, MessageCircle, Share2, User, Calendar, Tag } from 'lucide-react'

export default function PostCard({ post, isDetail = false }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分前`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}時間前`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}日前`
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{post.author}</h4>
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
        </div>
        
        {isDetail ? (
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        ) : (
          <Link href={`/post/${post.id}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
          </Link>
        )}
        
        <p className={`text-gray-700 leading-relaxed mb-4 ${isDetail ? '' : 'line-clamp-3'}`}>
          {post.content}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">コメント</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}