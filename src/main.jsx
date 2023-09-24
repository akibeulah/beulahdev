import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import {Blog} from "./pages/blog.jsx";
import {Projects} from "./pages/projects.jsx";
import {Experience} from "./pages/experience.jsx";
import {Home} from "./pages/home.jsx";
import {store} from "./store/index.js";
import {Provider} from "react-redux";
import ErrorPage from "./pages/errorPages.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/projects",
                element: <Projects/>
            },
            {
                path: "/blogs",
                element: <Blog/>
            },
            {
                path: "/experience",
                element: <Experience/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
