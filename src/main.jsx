import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'highlight.js/styles/github.min.css' // theme for code blocks

import App from './routes/App.jsx'
import ErrorTest from './routes/ErrorTest.jsx'
import NotFound from './routes/NotFound.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/error-test', element: <ErrorTest /> },
  { path: '*', element: <NotFound /> },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
