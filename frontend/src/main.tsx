import './globals.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { QueryClientProvider } from "react-query"
import { queryClient } from './services/queryClient.ts'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
