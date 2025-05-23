// Supabaseを使用したデータ管理
import { 
  fetchPosts, 
  fetchPostById, 
  createNewPost, 
  fetchUserPosts, 
  getCurrentUser 
} from './supabase'

// 投稿一覧を取得
export const getPosts = async () => {
  try {
    console.log('Supabaseから投稿を取得中...')
    const posts = await fetchPosts()
    console.log('取得した投稿数:', posts.length)
    return posts
  } catch (error) {
    console.error('投稿取得エラー:', error)
    // エラーの場合は空配列を返す
    return []
  }
}

// 特定の投稿を取得
export const getPostById = async (id) => {
  try {
    console.log('投稿を取得中 ID:', id)
    const post = await fetchPostById(id)
    return post
  } catch (error) {
    console.error('投稿取得エラー:', error)
    return null
  }
}

// 新しい投稿を作成
export const createPost = async (postData) => {
  try {
    console.log('新しい投稿を作成中:', postData.title)
    const post = await createNewPost(postData)
    console.log('投稿作成完了:', post.id)
    return post
  } catch (error) {
    console.error('投稿作成エラー:', error)
    throw error
  }
}

// 現在のユーザーの投稿を取得
export const getMyPosts = async () => {
  try {
    console.log('マイ投稿を取得中...')
    const posts = await fetchUserPosts()
    console.log('取得したマイ投稿数:', posts.length)
    return posts
  } catch (error) {
    console.error('マイ投稿取得エラー:', error)
    return []
  }
}

// 現在のユーザー情報を取得
export { getCurrentUser }

// いいね機能（将来の実装用）
export const toggleLike = async (postId) => {
  console.log('いいね機能は未実装です')
  return null
}