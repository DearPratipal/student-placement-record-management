import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css'; // agar CSS file hai to

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
