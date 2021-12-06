import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query'

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Cart from './components/Cart/Cart';
import Search from './components/Search/Search';
import Auth from './components/Auth/Auth';
import Cabinet from './components/Cabinet/Cabinet';
import Drugshop from './components/Drugshop/Drugshop';


const queryClient = new QueryClient()
const routs = (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cabinet" element={<Cabinet />} />
        <Route path='drugshop/:id' element={<Drugshop />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </BrowserRouter >
  </QueryClientProvider>
);

ReactDOM.render(
  routs,
  document.getElementById('root')
);

