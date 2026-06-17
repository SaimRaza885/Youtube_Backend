import { useState, useCallback } from 'react'

export const useFetch = (initialData = null) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (apiCall) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall()
      setData(response.data.data || response.data)
      return { success: true, data: response.data.data || response.data }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(initialData)
    setError(null)
    setLoading(false)
  }, [initialData])

  return { data, loading, error, execute, reset, setData, setError }
}
