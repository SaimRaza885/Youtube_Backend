import { useEffect } from 'react'

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} | Vidora` : 'Vidora'
    return () => { document.title = prev }
  }, [title])
}
