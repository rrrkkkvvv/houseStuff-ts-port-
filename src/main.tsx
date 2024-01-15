import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemesContextProvider from './contexts/theme-context.jsx'
import PopUpContextProvider from './contexts/popUp-context.jsx'
import OrdersContextProvider from './contexts/orders-context.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OrdersContextProvider>
      <PopUpContextProvider>
        <ThemesContextProvider>
          <App />
        </ThemesContextProvider>
      </PopUpContextProvider>
    </OrdersContextProvider>


  </React.StrictMode>,
)



