import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-loading-skeleton/dist/skeleton.css'

import './assets/css/index.css'
import './assets/css/animate.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
