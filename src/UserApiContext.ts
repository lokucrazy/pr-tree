import * as React from 'react'

export default React.createContext({
  user: '',
  api: '',
  setItems: () => {} 
} as { user?: string | null, api?: string | null, setItems: Function })