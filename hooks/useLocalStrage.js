import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // 初期値を設定
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 値を更新してローカルストレージに保存
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// 複数のローカルストレージキーを管理するカスタムフック
export function useMultipleLocalStorage(keys) {
  const [values, setValues] = useState({})

  useEffect(() => {
    if (typeof window === "undefined") return

    const initialValues = {}
    keys.forEach(({ key, initialValue }) => {
      try {
        const item = window.localStorage.getItem(key)
        initialValues[key] = item ? JSON.parse(item) : initialValue
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error)
        initialValues[key] = initialValue
      }
    })
    setValues(initialValues)
  }, [keys])

  const updateValue = (key, value) => {
    try {
      const valueToStore = value instanceof Function ? value(values[key]) : value
      setValues(prev => ({ ...prev, [key]: valueToStore }))
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [values, updateValue]
}