// ダミーデータとローカルストレージを使用したデータ管理

const STORAGE_KEYS = {
  POSTS: 'social-blog-posts',
  USER: 'social-blog-user'
}

// ダミーデータ
const dummyPosts = [
  {
    id: 1,
    title: 'Next.js 15の新機能について',
    content: 'Next.js 15がリリースされ、多くの新機能が追加されました。特にApp Routerの改善とServer Componentsの最適化が注目されています。パフォーマンスの向上も著しく、開発体験が大幅に改善されています。新しいキャッシュシステムや改良されたルーティング機能により、より効率的な開発が可能になりました。',
    author: 'ユーザー太郎',
    authorId: 'user123',
    tags: ['技術', 'Next.js', 'フロントエンド'],
    createdAt: '2025-05-22T10:30:00',
    likes: 24
  },
  {
    id: 2,
    title: '今日のランチ記録',
    content: '近所の新しいイタリアンレストランに行ってきました。パスタがとても美味しくて、また行きたいと思います。雰囲気も良く、デートにもおすすめです。特にカルボナーラが絶品で、チーズの濃厚さと卵のまろやかさが絶妙でした。',
    author: '田中花子',
    authorId: 'user456',
    tags: ['日記', 'グルメ'],
    createdAt: '2025-05-22T12:15:00',
    likes: 8
  },
  {
    id: 3,
    title: 'React Hooksを使いこなすコツ',
    content: 'useEffectやuseStateなどのReact Hooksを効果的に使うためのベストプラクティスをまとめました。依存配列の管理やカスタムHooksの作成方法など、実践的な内容を紹介します。特に、useCallbackやuseMemoの適切な使い分けについて詳しく解説しています。',
    author: '佐藤次郎',
    authorId: 'user789',
    tags: ['技術', 'React', 'フロントエンド'],
    createdAt: '2025-05-21T16:20:00',
    likes: 35
  },
  {
    id: 4,
    title: '週末の読書感想',
    content: '「人工知能は人間を超えるか」を読み終えました。AIの現状と未来について深く考えさせられる内容でした。技術者として、これからのAI時代について改めて考える良い機会になりました。特に、AGIの可能性と人間の役割について興味深い議論が展開されていました。',
    author: 'ユーザー太郎',
    authorId: 'user123',
    tags: ['読書', 'AI', '感想'],
    createdAt: '2025-05-21T09:45:00',
    likes: 12
  }
]

const defaultUser = {
  id: 'user123',
  name: 'ユーザー太郎',
  email: 'user@example.com'
}

// ブラウザ環境でのみローカルストレージを使用
const isClient = typeof window !== 'undefined'

// ローカルストレージからデータを取得
const getFromStorage = (key, defaultValue) => {
  if (!isClient) return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage:`, error)
    return defaultValue
  }
}

// ローカルストレージにデータを保存
const saveToStorage = (key, data) => {
  if (!isClient) return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving to localStorage:`, error)
  }
}

// データの初期化
const initializeData = () => {
  const existingPosts = getFromStorage(STORAGE_KEYS.POSTS, null)
  if (!existingPosts) {
    saveToStorage(STORAGE_KEYS.POSTS, dummyPosts)
  }
  
  const existingUser = getFromStorage(STORAGE_KEYS.USER, null)
  if (!existingUser) {
    saveToStorage(STORAGE_KEYS.USER, defaultUser)
  }
}

// 投稿一覧を取得
export const getPosts = async () => {
  // 初期化
  initializeData()
  
  // 非同期処理をシミュレート
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const posts = getFromStorage(STORAGE_KEYS.POSTS, dummyPosts)
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// 特定の投稿を取得
export const getPostById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const posts = getFromStorage(STORAGE_KEYS.POSTS, dummyPosts)
  return posts.find(post => post.id === parseInt(id))
}

// 現在のユーザーの投稿を取得
export const getMyPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const posts = getFromStorage(STORAGE_KEYS.POSTS, dummyPosts)
  const user = getFromStorage(STORAGE_KEYS.USER, defaultUser)
  
  return posts
    .filter(post => post.authorId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// 現在のユーザー情報を取得
export const getCurrentUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return getFromStorage(STORAGE_KEYS.USER, defaultUser)
}

// 新しい投稿を作成
export const createPost = async (postData) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const posts = getFromStorage(STORAGE_KEYS.POSTS, dummyPosts)
  const user = getFromStorage(STORAGE_KEYS.USER, defaultUser)
  
  const newPost = {
    id: Math.max(...posts.map(p => p.id)) + 1,
    title: postData.title,
    content: postData.content,
    author: user.name,
    authorId: user.id,
    tags: postData.tags || [],
    createdAt: new Date().toISOString(),
    likes: 0
  }
  
  const updatedPosts = [newPost, ...posts]
  saveToStorage(STORAGE_KEYS.POSTS, updatedPosts)
  
  return newPost
}

// 投稿にいいねを追加/削除
export const toggleLike = async (postId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const posts = getFromStorage(STORAGE_KEYS.POSTS, dummyPosts)
  const updatedPosts = posts.map(post => {
    if (post.id === postId) {
      return {
        ...post,
        likes: post.likes + 1 // 簡単のため、いいねは増加のみ
      }
    }
    return post
  })
  
  saveToStorage(STORAGE_KEYS.POSTS, updatedPosts)
  return updatedPosts.find(post => post.id === postId)
}