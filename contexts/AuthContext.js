// 'use client'

// import { createContext, useContext, useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'

// const AuthContext = createContext({})

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider')
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // 現在のセッションを取得
//     const getSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession()
//       setUser(session?.user ?? null)
//       setLoading(false)
//     }

//     getSession()

//     // 認証状態の変更を監視
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log('Auth state changed:', event, session?.user?.email)
//         setUser(session?.user ?? null)
//         setLoading(false)

//         // ユーザーがサインインした時にプロフィールを作成/更新
//         if (session?.user && event === 'SIGNED_IN') {
//           await createOrUpdateUserProfile(session.user)
//         }
//       }
//     )

//     return () => subscription.unsubscribe()
//   }, [])

//   // ユーザープロフィールを作成または更新
//   const createOrUpdateUserProfile = async (authUser) => {
//     try {
//       const { data, error } = await supabase
//         .from('users')
//         .upsert([
//           {
//             id: authUser.id,
//             email: authUser.email,
//             name: authUser.user_metadata?.full_name || authUser.email.split('@')[0],
//             avatar_url: authUser.user_metadata?.avatar_url
//           }
//         ])
//         .select()

//       if (error) {
//         console.error('プロフィール作成/更新エラー:', error)
//       } else {
//         console.log('プロフィール作成/更新完了:', data)
//       }
//     } catch (error) {
//       console.error('プロフィール処理エラー:', error)
//     }
//   }

//   // Googleでサインイン
//   const signInWithGoogle = async () => {
//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/auth/callback`
//         }
//       })

//       if (error) {
//         console.error('Google認証エラー:', error)
//         throw error
//       }

//       return data
//     } catch (error) {
//       console.error('サインインエラー:', error)
//       throw error
//     }
//   }

//   // サインアウト
//   const signOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut()
//       if (error) {
//         console.error('サインアウトエラー:', error)
//         throw error
//       }
//     } catch (error) {
//       console.error('サインアウトエラー:', error)
//       throw error
//     }
//   }

//   const value = {
//     user,
//     loading,
//     signInWithGoogle,
//     signOut
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

'use client'

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // 一時的にダミーデータで動作確認
  const [user, setUser] = useState({
    id: 'test-user-id',
    email: 'test@example.com',
    user_metadata: {
      full_name: 'テストユーザー'
    }
  })
  const [loading, setLoading] = useState(false)

  // ダミーの関数
  const signInWithGoogle = async () => {
    console.log('Google認証（ダミー）')
  }

  const signOut = async () => {
    console.log('サインアウト（ダミー）')
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}