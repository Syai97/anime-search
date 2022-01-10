import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './pages/detail';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
