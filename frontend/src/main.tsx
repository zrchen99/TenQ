import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx';

const theme = createTheme({
  
  typography: {
    fontFamily: "Roboto Slab, serif", 
    allVariants:{color: "white"},
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
