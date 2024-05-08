import React from 'react'
import ReactDOM from 'react-dom/client'
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createHashRouter, RouterProvider} from "react-router-dom";
import Homepage from './Homepage.jsx'
import Message from './Message.jsx'
import './index.css'

const router = createHashRouter([
    {
        path: "/",
        element: <Homepage />,
    }, {
        path: "/message/",
        element: <Message />,
    }
], { basename:"/Confetti4U/" });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
