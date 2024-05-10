import App from '@/view/Home/App'
import { createBrowserRouter } from 'react-router-dom'

import { lazy, Suspense } from 'react'

// 自定义懒加载函数
const lazyLoad = (factory: () => Promise<any>) => {
    const Module = lazy(factory)
    return (
        <Suspense>
            <Module />
        </Suspense>
    )
}
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/callback',
        element: lazyLoad(() => import('@/view/callback/index'))
    },
    {
        path: '/desk-lyrics',
        element: lazyLoad(() => import('@/view/DeskLyrics/index'))
    }
])
