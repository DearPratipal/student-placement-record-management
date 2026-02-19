import React from 'react';
import { Toaster } from "react-hot-toast";
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css'; // agar CSS file hai to

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <>
            <App />
            {/* <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "12px",
                        background: "#111827",
                        color: "#fff",
                        fontSize: "14px"
                    }
                }}
            /> */}
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: "#b91c1c",
                            color: "#fff"
                        }
                    },
                    error: {
                        style: {
                            background: "#1f2937",
                            color: "#fff"
                        }
                    }
                }}
            />
        </>
    </React.StrictMode>
);
