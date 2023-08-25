import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet';
import Logo from "./images/logo_azul.png"

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet>
      <link rel="icon" type="image/png" href={Logo} />
    </Helmet>
  </React.StrictMode>,
)
