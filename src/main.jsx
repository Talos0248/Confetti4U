// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import Homepage from './Homepage.jsx'
// import Message from './Message.jsx'
// import './index.css'
//
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Homepage />,
//     }, {
//         path: "/message/",
//         element: <Message />,
//     }
// ], { basename:"/Confetti4U/" });
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//       <RouterProvider router={router} />
//   </React.StrictMode>,
// )
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Homepage from './Homepage.jsx';
import Message from './Message.jsx';
import './index.css';

// Create your router
const router = createHashRouter([
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/message/',
        element: <Message />,
    }
]);

// Find the root element
const rootElement = document.getElementById('root');
// Create a root
const root = createRoot(rootElement);

// Render the application
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
