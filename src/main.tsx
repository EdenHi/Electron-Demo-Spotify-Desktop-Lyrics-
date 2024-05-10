import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './view/Home/App'

import './index.css'

import { router } from './router/main'
import { RouterProvider } from 'react-router-dom'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.Component>
    <RouterProvider router={router} />
    // </React.Component>
)

// postMessage({ payload: 'removeLoading' }, '*')
