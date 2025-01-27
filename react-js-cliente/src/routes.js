import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Book from './pages/Book/index';
import NewBook from './pages/NewBook';


export default function Rotas() {
    return (
        <BrowserRouter>   
          <Routes>
              <Route path="/" element={<Login />} />       
              <Route path="/book" element={<Book />} /> 
              <Route path="/book/new/:bookId" element={<NewBook />} />    
          </Routes>       
        </BrowserRouter>
    );
}