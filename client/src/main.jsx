import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import 'react-toastify/dist/ReactToastify.css'
import store from './store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Container className='mt-5'>
          <App />
          <ToastContainer />
        </Container>
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
