// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Supabaseの環境変数が設定されていません')
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// // テスト用のダミーユーザーID（認証実装まで使用）
// const DUMMY_USER_ID = '00000000-0000-0000-0000-000000000001'

// // 投稿一覧を取得
// export const fetchPosts = async () => {
//   try {
//     const { data, error } = await supabase
//       .from('posts')
//       .select(`
//         *,
//         users (
//           name
//         ),
//         post_tags (
//           tags (
//             name
//           )
//         )
//       `)
//       .order('created_at', { ascending: false })

//     if (error) {
//       console.error('投稿取得エラー:', error)
//       // エラーの場合は空配列を返す
//       return []
//     }

//     // データを整形
//     return data.map(post => ({
//       id: post.id,
//       title: post.title,
//       content: post.content,
//       author: post.users?.name || 'テストユーザー',
//       authorId: post.author_id,
//       tags: post.post_tags.map(pt => pt.tags.name),
//       createdAt: post.created_at,
//       likes: post.likes_count || 0
//     }))
//   } catch (error) {
//     console.error('投稿取得中にエラーが発生:', error)
//     return []
//   }
// }

// // 特定の投稿を取得
// export const fetchPostById = async (id) => {
//   try {
//     const { data, error } = await supabase
//       .from('posts')
//       .select(`
//         *,
//         users (
//           name
//         ),
//         post_tags (
//           tags (
//             name
//           )
//         )
//       `)
//       .eq('id', id)
//       .single()

//     if (error) {
//       console.error('投稿取得エラー:', error)
//       return null
//     }

//     if (!data) return null

//     // データを整形
//     return {
//       id: data.id,
//       title: data.title,
//       content: data.content,
//       author: data.users?.name || 'テストユーザー',
//       authorId: data.author_id,
//       tags: data.post_tags.map(pt => pt.tags.name),
//       createdAt: data.created_at,
//       likes: data.likes_count || 0
//     }
//   } catch (error) {
//     console.error('投稿取得中にエラーが発生:', error)
//     return null
//   }
// }

// // 新しい投稿を作成
// export const createNewPost = async (postData) => {
//   try {
//     // まず投稿を作成
//     const { data: post, error: postError } = await supabase
//       .from('posts')
//       .insert([
//         {
//           title: postData.title,
//           content: postData.content,
//           author_id: DUMMY_USER_ID // 認証実装まではダミーID
//         }
//       ])
//       .select()
//       .single()

//     if (postError) {
//       console.error('投稿作成エラー:', postError)
//       throw postError
//     }

//     // タグがある場合は関連付け
//     if (postData.tags && postData.tags.length > 0) {
//       await addTagsToPost(post.id, postData.tags)
//     }

//     return post
//   } catch (error) {
//     console.error('投稿作成中にエラーが発生:', error)
//     throw error
//   }
// }

// // 投稿にタグを関連付け
// const addTagsToPost = async (postId, tagNames) => {
//   try {
//     const tagIds = []
    
//     for (const tagName of tagNames) {
//       // 既存のタグを確認
//       let { data: existingTag, error: selectError } = await supabase
//         .from('tags')
//         .select('id')
//         .eq('name', tagName)
//         .single()

//       if (selectError && selectError.code !== 'PGRST116') {
//         console.error('タグ検索エラー:', selectError)
//         continue
//       }

//       if (!existingTag) {
//         // タグが存在しない場合は新規作成
//         const { data: newTag, error: tagError } = await supabase
//           .from('tags')
//           .insert([{ name: tagName }])
//           .select()
//           .single()

//         if (tagError) {
//           console.error('タグ作成エラー:', tagError)
//           continue
//         }
//         existingTag = newTag
//       }
      
//       if (existingTag?.id) {
//         tagIds.push(existingTag.id)
//       }
//     }

//     // 投稿とタグを関連付け
//     if (tagIds.length > 0) {
//       const postTagsData = tagIds.map(tagId => ({
//         post_id: postId,
//         tag_id: tagId
//       }))

//       const { error: postTagsError } = await supabase
//         .from('post_tags')
//         .insert(postTagsData)

//       if (postTagsError) {
//         console.error('投稿タグ関連付けエラー:', postTagsError)
//       }
//     }
//   } catch (error) {
//     console.error('タグ関連付け中にエラーが発生:', error)
//   }
// }

// // ユーザーの投稿を取得（現在はダミーユーザーの投稿のみ）
// export const fetchUserPosts = async () => {
//   try {
//     const { data, error } = await supabase
//       .from('posts')
//       .select(`
//         *,
//         users (
//           name
//         ),
//         post_tags (
//           tags (
//             name
//           )
//         )
//       `)
//       .eq('author_id', DUMMY_USER_ID)
//       .order('created_at', { ascending: false })

//     if (error) {
//       console.error('ユーザー投稿取得エラー:', error)
//       return []
//     }

//     // データを整形
//     return data.map(post => ({
//       id: post.id,
//       title: post.title,
//       content: post.content,
//       author: post.users?.name || 'テストユーザー',
//       authorId: post.author_id,
//       tags: post.post_tags.map(pt => pt.tags.name),
//       createdAt: post.created_at,
//       likes: post.likes_count || 0
//     }))
//   } catch (error) {
//     console.error('ユーザー投稿取得中にエラーが発生:', error)
//     return []
//   }
// }

// // 現在のユーザー情報を取得（ダミー）
// export const getCurrentUser = async () => {
//   return {
//     id: DUMMY_USER_ID,
//     name: 'テストユーザー',
//     email: 'test@example.com'
//   }
// }

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 現在のユーザーIDを取得するヘルパー関数
const getCurrentUserId = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id || null
}

// 投稿一覧を取得
export const fetchPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          name
        ),
        post_tags (
          tags (
            name
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('投稿取得エラー:', error)
      // エラーの場合は空配列を返す
      return []
    }

    // データを整形
    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.users?.name || 'テストユーザー',
      authorId: post.author_id,
      tags: post.post_tags.map(pt => pt.tags.name),
      createdAt: post.created_at,
      likes: post.likes_count || 0
    }))
  } catch (error) {
    console.error('投稿取得中にエラーが発生:', error)
    return []
  }
}

// 特定の投稿を取得
export const fetchPostById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          name
        ),
        post_tags (
          tags (
            name
          )
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('投稿取得エラー:', error)
      return null
    }

    if (!data) return null

    // データを整形
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.users?.name || 'テストユーザー',
      authorId: data.author_id,
      tags: data.post_tags.map(pt => pt.tags.name),
      createdAt: data.created_at,
      likes: data.likes_count || 0
    }
  } catch (error) {
    console.error('投稿取得中にエラーが発生:', error)
    return null
  }
}

// 新しい投稿を作成
export const createNewPost = async (postData) => {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      throw new Error('認証が必要です')
    }

    // まず投稿を作成
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert([
        {
          title: postData.title,
          content: postData.content,
          author_id: userId
        }
      ])
      .select()
      .single()

    if (postError) {
      console.error('投稿作成エラー:', postError)
      throw postError
    }

    // タグがある場合は関連付け
    if (postData.tags && postData.tags.length > 0) {
      await addTagsToPost(post.id, postData.tags)
    }

    return post
  } catch (error) {
    console.error('投稿作成中にエラーが発生:', error)
    throw error
  }
}

// 投稿にタグを関連付け
const addTagsToPost = async (postId, tagNames) => {
  try {
    const tagIds = []
    
    for (const tagName of tagNames) {
      // 既存のタグを確認
      let { data: existingTag, error: selectError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', tagName)
        .single()

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('タグ検索エラー:', selectError)
        continue
      }

      if (!existingTag) {
        // タグが存在しない場合は新規作成
        const { data: newTag, error: tagError } = await supabase
          .from('tags')
          .insert([{ name: tagName }])
          .select()
          .single()

        if (tagError) {
          console.error('タグ作成エラー:', tagError)
          continue
        }
        existingTag = newTag
      }
      
      if (existingTag?.id) {
        tagIds.push(existingTag.id)
      }
    }

    // 投稿とタグを関連付け
    if (tagIds.length > 0) {
      const postTagsData = tagIds.map(tagId => ({
        post_id: postId,
        tag_id: tagId
      }))

      const { error: postTagsError } = await supabase
        .from('post_tags')
        .insert(postTagsData)

      if (postTagsError) {
        console.error('投稿タグ関連付けエラー:', postTagsError)
      }
    }
  } catch (error) {
    console.error('タグ関連付け中にエラーが発生:', error)
  }
}

// ユーザーの投稿を取得
export const fetchUserPosts = async () => {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      throw new Error('認証が必要です')
    }

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          name
        ),
        post_tags (
          tags (
            name
          )
        )
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('ユーザー投稿取得エラー:', error)
      return []
    }

    // データを整形
    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.users?.name || 'テストユーザー',
      authorId: post.author_id,
      tags: post.post_tags.map(pt => pt.tags.name),
      createdAt: post.created_at,
      likes: post.likes_count || 0
    }))
  } catch (error) {
    console.error('ユーザー投稿取得中にエラーが発生:', error)
    return []
  }
}

// 現在のユーザー情報を取得
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user) {
    return null
  }

  return {
    id: session.user.id,
    name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
    email: session.user.email
  }
}